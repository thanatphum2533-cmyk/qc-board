// Vercel Serverless Function: /api/extract-news
// ดึงภาพปกข่าว (og:image), หัวข้อข่าว (og:title), และเนื้อหาข่าวจากเว็บข่าวไทยและต่างประเทศ

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const targetUrl = (req.query?.url || '').trim();
  if (!targetUrl) {
    return res.status(400).json({ status: 'error', message: 'Missing url parameter' });
  }

  try {
    const parsedUrl = new URL(targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`);
    const domain = parsedUrl.hostname.replace(/^www\./, '');

    const response = await fetch(parsedUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'th-TH,th;q=0.9,en;q=0.8'
      },
      redirect: 'follow'
    });

    const html = await response.text();

    const extractMeta = (props) => {
      for (const prop of props) {
        const r1 = new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i');
        const m1 = html.match(r1);
        if (m1 && m1[1]) return decodeEntities(m1[1].trim());

        const r2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`, 'i');
        const m2 = html.match(r2);
        if (m2 && m2[1]) return decodeEntities(m2[1].trim());
      }
      return '';
    };

    let title = extractMeta(['og:title', 'twitter:title']);
    if (!title) {
      const tMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      if (tMatch && tMatch[1]) {
        title = decodeEntities(tMatch[1].replace(/\s+/g, ' ').trim());
      }
    }

    let image = extractMeta(['og:image', 'twitter:image', 'og:image:url']);
    if (image && image.startsWith('//')) {
      image = 'https:' + image;
    } else if (image && image.startsWith('/')) {
      image = `${parsedUrl.protocol}//${parsedUrl.host}${image}`;
    }

    const description = extractMeta(['og:description', 'description', 'twitter:description']);

    // Extract clean paragraphs
    const cleaned = html.replace(/<(script|style|noscript)[^>]*>[\s\S]*?<\/\1>/gi, ' ');
    const pMatches = [...cleaned.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
    const paragraphs = [];
    for (const pm of pMatches) {
      const txt = decodeEntities(pm[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
      if (txt.length >= 35 && !/cookie|copyright|สงวนลิขสิทธิ์/i.test(txt)) {
        paragraphs.push(txt);
      }
      if (paragraphs.length >= 5) break;
    }

    return res.status(200).json({
      status: 'success',
      url: parsedUrl.toString(),
      domain,
      title: title || `ข่าวจาก ${domain}`,
      image,
      description: description || (paragraphs[0] || ''),
      paragraphs
    });
  } catch (err) {
    return res.status(200).json({
      status: 'error',
      message: String(err.message || err)
    });
  }
}

function decodeEntities(str) {
  return String(str || '')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}
