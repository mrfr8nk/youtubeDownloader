
import type { VercelRequest, VercelResponse } from '@vercel/node';

let downloadHistory: any[] = [];

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(downloadHistory);
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
