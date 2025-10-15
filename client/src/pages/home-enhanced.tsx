import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { EnhancedSearchBar } from "@/components/enhanced-search-bar";
import { VideoPreview } from "@/components/video-preview";
import { QualitySelector } from "@/components/quality-selector";
import { DownloadHistory } from "@/components/download-history";
import { ThemeToggle } from "@/components/theme-toggle";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { YoutubeVideo } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Heart, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomeEnhanced() {
  const [videoData, setVideoData] = useState<YoutubeVideo | null>(null);
  const { toast } = useToast();

  const fetchVideoMutation = useMutation({
    mutationFn: async (url: string) => {
      return await apiRequest("/api/youtube/fetch", "POST", { url }) as YoutubeVideo;
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
      {/* Header */}
      <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-chart-3 flex items-center justify-center">
              <Download className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold" data-testid="text-app-title">
              YouTube Downloader
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/sponsor">
              <Button variant="outline" size="sm" data-testid="button-sponsor">
                <Heart className="h-4 w-4 mr-2 text-primary" />
                Support Developer
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-chart-3/5 to-chart-2/5 dark:from-primary/10 dark:via-chart-3/10 dark:to-chart-2/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Fast & Free Forever</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Download YouTube Videos
              <br />
              <span className="bg-gradient-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
                In Any Quality
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Fast, reliable, and easy to use. Download videos in multiple qualities or extract audio in MP3 format.
            </p>

            <div className="flex justify-center pt-4">
              <EnhancedSearchBar
                onSearch={handleSearch}
                isLoading={fetchVideoMutation.isPending}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-chart-2"></div>
                <span>HD Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-chart-3"></div>
                <span>MP3 Audio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>No Registration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
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

      {/* Footer */}
      <footer className="border-t mt-20 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-chart-3 flex items-center justify-center">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">YouTube Downloader</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Download YouTube videos and audio in the highest quality. Fast, free, and always available.
              </p>
              <div className="flex gap-2">
                <Link href="/sponsor">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2 text-primary" />
                    Support This Project
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multiple quality options</li>
                <li>• MP3 audio extraction</li>
                <li>• Download history</li>
                <li>• No registration required</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Developer</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/sponsor" className="hover:text-foreground transition-colors">
                    Darrell Mucheri
                  </Link>
                </li>
                <li>
                  <a href="https://github.com/mrfr8nk" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="mailto:darrelmucheri@gmail.com" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Darrell Mucheri | Built with <Heart className="inline h-4 w-4 text-primary" /> for the community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
