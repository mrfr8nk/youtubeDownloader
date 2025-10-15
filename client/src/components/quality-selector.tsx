import { Download, Music, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { YoutubeVideo } from "@shared/schema";

interface QualitySelectorProps {
  video: YoutubeVideo;
  onDownload: (url: string, quality: string) => void;
}

const formatFileSize = (bytes?: string | number): string => {
  if (!bytes) return "";
  const size = typeof bytes === 'string' ? parseInt(bytes) : bytes;
  if (isNaN(size)) return "";
  const mb = size / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(size / 1024).toFixed(0)} KB`;
};

const qualityLabels: Record<string, { label: string; color: string }> = {
  "1080": { label: "1080p HD", color: "bg-chart-2 text-white" },
  "720": { label: "720p HD", color: "bg-chart-3 text-white" },
  "480": { label: "480p", color: "bg-secondary text-secondary-foreground" },
  "360": { label: "360p", color: "bg-secondary text-secondary-foreground" },
  "240": { label: "240p", color: "bg-muted text-muted-foreground" },
  "144": { label: "144p", color: "bg-muted text-muted-foreground" },
};

export function QualitySelector({ video, onDownload }: QualitySelectorProps) {
  const handleDownload = (url: string, quality: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${video.title}-${quality}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onDownload(url, quality);
  };

  const handleAudioDownload = () => {
    const link = document.createElement("a");
    link.href = video.audio;
    link.download = `${video.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onDownload(video.audio, "MP3");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Audio Download
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleAudioDownload}
            className="w-full"
            variant="default"
            data-testid="button-download-audio"
          >
            <Download className="mr-2 h-4 w-4" />
            Download MP3 Audio
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Video Downloads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(video.videos).map(([quality, url]) => {
              const qualityInfo = qualityLabels[quality] || {
                label: `${quality}p`,
                color: "bg-muted text-muted-foreground",
              };
              const fileSize = video.videoSizes?.[quality];
              
              return (
                <Button
                  key={quality}
                  onClick={() => handleDownload(url, quality)}
                  variant="outline"
                  className="flex flex-col items-start justify-between gap-1 h-auto py-3"
                  data-testid={`button-download-${quality}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Badge className={qualityInfo.color}>{qualityInfo.label}</Badge>
                    <Download className="h-4 w-4" />
                  </div>
                  {fileSize && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {formatFileSize(fileSize)}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
