
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const videoId = req.query.videoId as string;
  if (!videoId) {
    return res.status(400).json({ message: 'videoId is required' });
  }

  try {
    const response = await fetch(`https://yt-dl.officialhectormanuel.workers.dev/${videoId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch video info');
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch video info' });
  }
}
