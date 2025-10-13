import { z } from "zod";

export const youtubeVideoSchema = z.object({
  status: z.boolean(),
  creator: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  audio: z.string(),
  videos: z.record(z.string()),
});

export type YoutubeVideo = z.infer<typeof youtubeVideoSchema>;

export const downloadHistoryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  quality: z.string(),
  downloadUrl: z.string(),
  timestamp: z.number(),
});

export const insertDownloadHistorySchema = downloadHistoryItemSchema.omit({ 
  id: true, 
  timestamp: true 
});

export type DownloadHistoryItem = z.infer<typeof downloadHistoryItemSchema>;
export type InsertDownloadHistory = z.infer<typeof insertDownloadHistorySchema>;

export const youtubeRequestSchema = z.object({
  url: z.string().url(),
});

export type YoutubeRequest = z.infer<typeof youtubeRequestSchema>;
