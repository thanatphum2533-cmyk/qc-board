// Vercel Serverless Function: /api/state
// รองรับการเก็บข้อมูล 3 ชั้น:
// 1. Vercel KV / Upstash Redis (หากเชื่อม Storage ในหน้า Vercel Dashboard)
// 2. Serverless /tmp + Memory Cache
// 3. ทำงานร่วมกับ Browser LocalStorage Auto-Rehydration (เครื่องที่มีข้อมูลใหม่กว่าจะซิงค์กู้คืนให้เซิร์ฟเวอร์อัตโนมัติ)

import fs from 'fs';
import path from 'path';

const TMP_DB_PATH = path.join('/tmp', 'qc_board_db.json');
const KV_KEY = 'qc_board_state_v4';
let memoryState = null;

async function readFromVercelKV() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/get/${KV_KEY}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.result) {
      return typeof json.result === 'string' ? JSON.parse(json.result) : json.result;
    }
  } catch (e) {}
  return null;
}

async function writeToVercelKV(payload) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;
  try {
    await fetch(`${url}/set/${KV_KEY}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (e) {
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    let data = await readFromVercelKV();
    if (!data) data = memoryState;
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
      storageMode: (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) ? 'vercel-kv-permanent' : 'hybrid-sync',
      lanUrl: host ? `${proto}://${host}` : ''
    });
  }

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      payload.updatedAt = payload.updatedAt || Date.now();
      memoryState = payload;
      try {
        fs.writeFileSync(TMP_DB_PATH, JSON.stringify(payload), 'utf8');
      } catch (e) {}
      await writeToVercelKV(payload);
      return res.status(200).json({ status: 'success', updatedAt: payload.updatedAt });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: String(err.message || err) });
    }
  }

  return res.status(405).json({ status: 'error', message: 'Method not allowed' });
}
