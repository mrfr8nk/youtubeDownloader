import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SearchBar } from "@/components/search-bar";
import { VideoPreview } from "@/components/video-preview";
import { QualitySelector } from "@/components/quality-selector";
import { DownloadHistory } from "@/components/download-history";
import { ThemeToggle } from "@/components/theme-toggle";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { YoutubeVideo } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [videoData, setVideoData] = useState<YoutubeVideo | null>(null);
  const { toast } = useToast();

  const fetchVideoMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("/api/youtube/fetch", "POST", { url });
      return response as YoutubeVideo;
    },
    onSuccess: (data) => {
      if (data.status) {
        setVideoData(data);
        toast({
          title: "Video loaded successfully!",
          description: "Select a quality to download",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to load video",
          description: "Please check the URL and try again",
        });
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch video data. Please try again.",
      });
    },
  });

  const addHistoryMutation = useMutation({
    mutationFn: (item: {
      title: string;
      thumbnail: string;
      quality: string;
      downloadUrl: string;
    }) => apiRequest("/api/download-history", "POST", item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/download-history"] });
      toast({
        title: "Download started!",
        description: "Your download has been added to history",
      });
    },
  });

  const handleSearch = (url: string) => {
    fetchVideoMutation.mutate(url);
  };

  const handleDownload = (downloadUrl: string, quality: string) => {
    if (videoData) {
      addHistoryMutation.mutate({
        title: videoData.title,
        thumbnail: videoData.thumbnail,
        quality,
        downloadUrl,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold" data-testid="text-app-title">
            YouTube Downloader
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
              Download YouTube Videos & Audio
            </h2>
            <p className="text-lg text-muted-foreground">
              Fast and easy YouTube downloader - Multiple quality options available
            </p>
          </div>

          <div className="flex justify-center">
            <SearchBar
              onSearch={handleSearch}
              isLoading={fetchVideoMutation.isPending}
            />
          </div>

          {videoData && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <VideoPreview video={videoData} />
                <QualitySelector video={videoData} onDownload={handleDownload} />
              </div>
              <div className="lg:col-span-1">
                <DownloadHistory />
              </div>
            </div>
          )}

          {!videoData && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2"></div>
              <div className="lg:col-span-1">
                <DownloadHistory />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Mr. Frank | YouTube Downloader
          </p>
        </div>
      </footer>
    </div>
  );
}
