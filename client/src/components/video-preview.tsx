import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import type { YoutubeVideo } from "@shared/schema";

interface VideoPreviewProps {
  video: YoutubeVideo;
}

export function VideoPreview({ video }: VideoPreviewProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            data-testid="img-video-thumbnail"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-primary rounded-full p-4">
              <Play className="h-8 w-8 text-primary-foreground fill-current" />
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2" data-testid="text-video-title">
          {video.title}
        </h2>
      </CardContent>
    </Card>
  );
}
