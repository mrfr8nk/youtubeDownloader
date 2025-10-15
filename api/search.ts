
import type { VercelRequest, VercelResponse } from '@vercel/node';
import yts from 'yt-search';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const results = await yts(query);
    const videos = results.videos.slice(0, 10).map(video => ({
      id: video.videoId,
      title: video.title,
      thumbnail: video.thumbnail,
      duration: video.timestamp,
      channel: video.author.name,
      views: video.views,
      url: video.url
    }));
    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to search videos' });
  }
}
