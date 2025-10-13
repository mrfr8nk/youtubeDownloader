import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (url: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateYoutubeUrl = (input: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    if (!validateYoutubeUrl(url)) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setError("");
    onSearch(url);
  };

  const handleClear = () => {
    setUrl("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Paste YouTube URL here..."
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
          className="h-14 pl-12 pr-24 text-base"
          data-testid="input-youtube-url"
        />
        {url && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-16 top-1/2 -translate-y-1/2"
            data-testid="button-clear-url"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="submit"
          variant="default"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          disabled={isLoading}
          data-testid="button-search"
        >
          {isLoading ? "Loading..." : "Fetch"}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-destructive mt-2" data-testid="text-error">
          {error}
        </p>
      )}
    </form>
  );
}
