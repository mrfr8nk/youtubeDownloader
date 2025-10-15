import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { youtubeRequestSchema, youtubeVideoSchema, insertDownloadHistorySchema, youtubeSearchSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/youtube/search", async (req, res) => {
    try {
      const { query } = youtubeSearchSchema.parse(req.body);
      
      // Mock search results for now - in production, you'd integrate with YouTube Data API
      const mockResults = [
        {
          id: "1",
          title: `${query} - Music Video`,
          thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
          duration: "3:32",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          id: "2",
          title: `${query} - Official Video`,
          thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
          duration: "4:15",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          id: "3",
          title: `${query} - Live Performance`,
          thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
          duration: "5:42",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ];
      
      res.json(mockResults);
    } catch (error) {
      console.error("Error searching YouTube:", error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid search query" 
      });
    }
  });

  app.post("/api/youtube/fetch", async (req, res) => {
    try {
      const { url } = youtubeRequestSchema.parse(req.body);
      
      const apiUrl = `https://yt-dl.officialhectormanuel.workers.dev/?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        return res.status(response.status).json({ 
          error: "Failed to fetch video data" 
        });
      }
      
      const data = await response.json();
      const validatedData = youtubeVideoSchema.parse(data);
      res.json(validatedData);
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid request" 
      });
    }
  });

  app.post("/api/download-history", async (req, res) => {
    try {
      const validatedData = insertDownloadHistorySchema.parse(req.body);
      const historyItem = await storage.addDownloadHistory({
        ...validatedData,
        timestamp: Date.now(),
      });
      res.json(historyItem);
    } catch (error) {
      console.error("Error adding to download history:", error);
      res.status(500).json({ error: "Failed to add to history" });
    }
  });

  app.get("/api/download-history", async (_req, res) => {
    try {
      const history = await storage.getDownloadHistory();
      res.json(history);
    } catch (error) {
      console.error("Error fetching download history:", error);
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  app.delete("/api/download-history", async (_req, res) => {
    try {
      await storage.clearDownloadHistory();
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing download history:", error);
      res.status(500).json({ error: "Failed to clear history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
