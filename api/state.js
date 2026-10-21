// Vercel Serverless Function: /api/state
// รองรับการแชร์ข้อมูลกระดาน QC Board บน Vercel (ใช้ /tmp บน Serverless Instance หรือเชื่อมต่อ KV ได้)

import fs from 'fs';
import path from 'path';

const TMP_DB_PATH = path.join('/tmp', 'qc_board_db.json');
let memoryState = null;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    let data = memoryState;
    if (!data) {
      try {
        if (fs.existsSync(TMP_DB_PATH)) {
          data = JSON.parse(fs.readFileSync(TMP_DB_PATH, 'utf8'));
          memoryState = data;
        }
      } catch (e) {}
    }

    const host = req.headers['x-forwarded-host'] || req.headers.host || '';
    const proto = req.headers['x-forwarded-proto'] || 'https';

    return res.status(200).json({
      status: 'success',
      hasData: Boolean(data),
      data: data || null,
      lanUrl: host ? `${proto}://${host}` : ''
    });
  }

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      payload.updatedAt = Date.now();
      memoryState = payload;
      try {
        fs.writeFileSync(TMP_DB_PATH, JSON.stringify(payload), 'utf8');
      } catch (e) {}
      return res.status(200).json({ status: 'success', updatedAt: payload.updatedAt });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: String(err.message || err) });
    }
  }

  return res.status(405).json({ status: 'error', message: 'Method not allowed' });
}
