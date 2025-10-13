import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, History, Trash2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { DownloadHistoryItem } from "@shared/schema";

export function DownloadHistory() {
  const { data: history = [], isLoading } = useQuery<DownloadHistoryItem[]>({
    queryKey: ["/api/download-history"],
  });

  const clearHistoryMutation = useMutation({
    mutationFn: () => apiRequest("/api/download-history", "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/download-history"] });
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Downloads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Downloads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground" data-testid="text-no-history">
            No downloads yet. Download a video to see it here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Recent Downloads
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => clearHistoryMutation.mutate()}
          data-testid="button-clear-history"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {history.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-lg hover-elevate border"
            data-testid={`history-item-${item.id}`}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-12 object-cover rounded"
              data-testid={`img-history-thumbnail-${item.id}`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" data-testid={`text-history-title-${item.id}`}>
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.quality} • {new Date(item.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(item.downloadUrl, "_blank")}
              data-testid={`button-redownload-${item.id}`}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
