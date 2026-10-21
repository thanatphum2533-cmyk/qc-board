import http.server
import socketserver
import urllib.request
import urllib.parse
import json
import re
import html as html_lib
import os
import sys
import socket
import time

PORT = 8765
WEB_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(WEB_DIR, "board_db.json")


def get_lan_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


def load_db():
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return None


def save_db(payload):
    payload["updatedAt"] = int(time.time() * 1000)
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    return payload["updatedAt"]


def extract_meta(html_text, prop_names):
    for prop in prop_names:
        p1 = re.search(
            rf'<meta[^>]+(?:property|name)=["\']{re.escape(prop)}["\'][^>]+content=["\']([^"\']+)["\']',
            html_text,
            re.IGNORECASE,
        )
        if p1:
            return html_lib.unescape(p1.group(1).strip())
        p2 = re.search(
            rf'<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']{re.escape(prop)}["\']',
            html_text,
            re.IGNORECASE,
        )
        if p2:
            return html_lib.unescape(p2.group(1).strip())
    return ""


def extract_paragraphs(html_text):
    cleaned = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", " ", html_text, flags=re.DOTALL | re.IGNORECASE)
    paras = re.findall(r"<p[^>]*>(.*?)</p>", cleaned, flags=re.DOTALL | re.IGNORECASE)
    good = []
    for p in paras:
        txt = re.sub(r"<[^>]+>", " ", p)
        txt = html_lib.unescape(re.sub(r"\s+", " ", txt)).strip()
        if len(txt) >= 35 and not any(skip in txt.lower() for skip in ["cookie", "copyright", "สงวนลิขสิทธิ์"]):
            good.append(txt)
        if len(good) >= 5:
            break
    return good


def scrape_news_url(target_url):
    parsed = urllib.parse.urlparse(target_url)
    domain = parsed.netloc.replace("www.", "")
    req = urllib.request.Request(
        target_url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "th-TH,th;q=0.9,en;q=0.8",
        },
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        raw_bytes = resp.read(600_000)
        try:
            html_text = raw_bytes.decode("utf-8")
        except UnicodeDecodeError:
            charset = resp.headers.get_content_charset() or "tis-620"
            html_text = raw_bytes.decode(charset, errors="ignore")

    title = extract_meta(html_text, ["og:title", "twitter:title"])
    if not title:
        t_match = re.search(r"<title[^>]*>(.*?)</title>", html_text, re.DOTALL | re.IGNORECASE)
        if t_match:
            title = html_lib.unescape(re.sub(r"\s+", " ", t_match.group(1)).strip())

    image = extract_meta(html_text, ["og:image", "twitter:image", "og:image:url"])
    if image and image.startswith("//"):
        image = "https:" + image
    elif image and image.startswith("/"):
        image = f"{parsed.scheme}://{parsed.netloc}{image}"

    description = extract_meta(html_text, ["og:description", "description", "twitter:description"])
    paragraphs = extract_paragraphs(html_text)

    return {
        "status": "success",
        "url": target_url,
        "domain": domain,
        "title": title or f"ข่าวจาก {domain}",
        "image": image,
        "description": description or (paragraphs[0] if paragraphs else ""),
        "paragraphs": paragraphs,
    }


class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True


class QCBoardHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_DIR, **kwargs)

    def log_message(self, format, *args):
        pass

    def send_json(self, obj, status=200):
        data = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)

        # 1. Shared Organization State API
        if parsed_path.path == "/api/state":
            db = load_db()
            lan_ip = get_lan_ip()
            self.send_json({
                "status": "success",
                "hasData": db is not None,
                "data": db,
                "lanUrl": f"http://{lan_ip}:{PORT}"
            })
            return

        # 2. News Thumbnail & Article Extractor API
        if parsed_path.path == "/api/extract-news":
            qs = urllib.parse.parse_qs(parsed_path.query)
            target_url = (qs.get("url") or [""])[0].strip()
            if not target_url:
                self.send_json({"status": "error", "message": "Missing url"})
                return
            try:
                data = scrape_news_url(target_url)
                self.send_json(data)
            except Exception as e:
                self.send_json({"status": "error", "message": str(e)})
            return

        return super().do_GET()

    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path)
        if parsed_path.path == "/api/state":
            length = int(self.headers.get("Content-Length", "0"))
            body = self.rfile.read(length).decode("utf-8", errors="ignore")
            try:
                payload = json.loads(body)
                updated_at = save_db(payload)
                self.send_json({"status": "success", "updatedAt": updated_at})
            except Exception as e:
                self.send_json({"status": "error", "message": str(e)}, status=400)
            return
        self.send_json({"status": "error", "message": "Not found"}, status=404)


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if "--test" in sys.argv:
        res = scrape_news_url("https://www.sanook.com/health/")
        print(json.dumps(res, ensure_ascii=False, indent=2))
        sys.exit(0)

    lan_ip = get_lan_ip()
    with ThreadingTCPServer(("0.0.0.0", PORT), QCBoardHandler) as httpd:
        print(f"============================================================")
        print(f"  QC Board Server พร้อมใช้งานสำหรับทั้งออฟฟิศแล้ว!")
        print(f"  - เปิดจากเครื่องนี้:     http://127.0.0.1:{PORT}")
        print(f"  - ลิงก์แชร์ให้คนในออฟฟิศ: http://{lan_ip}:{PORT}")
        print(f"============================================================")
        httpd.serve_forever()
