import { useState, useEffect, useRef } from "react";
import { Search, X, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface SearchBarProps {
  onSearch: (url: string) => void;
  isLoading?: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  url: string;
}

export function EnhancedSearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const validateYoutubeUrl = (input: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(input);
  };

  const searchMutation = useMutation({
    mutationFn: async (query: string) => {
      return await apiRequest("/api/youtube/search", "POST", { query }) as SearchResult[];
    },
    onSuccess: (data) => {
      setSearchResults(data || []);
      setShowResults(data && data.length > 0);
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (input && !validateYoutubeUrl(input)) {
      const debounce = setTimeout(() => {
        if (input.length >= 3) {
          searchMutation.mutate(input);
        }
      }, 500);
      return () => clearTimeout(debounce);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError("Please enter a YouTube URL or search query");
      return;
    }

    if (!validateYoutubeUrl(input)) {
      setError("Please enter a valid YouTube URL or select from search results");
      return;
    }

    setError("");
    setShowResults(false);
    onSearch(input);
  };

  const handleClear = () => {
    setInput("");
    setError("");
    setShowResults(false);
    setSearchResults([]);
  };

  const handleSelectResult = (url: string) => {
    setInput(url);
    setShowResults(false);
    onSearch(url);
  };

  return (
    <div className="w-full max-w-3xl relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-chart-3 to-primary rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
            <Input
              type="text"
              placeholder="Search YouTube or paste URL..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
              className="h-16 pl-14 pr-32 text-base rounded-2xl bg-card border-2 focus:border-primary transition-all"
              data-testid="input-youtube-search"
            />
            {input && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="absolute right-20 top-1/2 -translate-y-1/2"
                data-testid="button-clear-search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              type="submit"
              variant="default"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6"
              disabled={isLoading}
              data-testid="button-fetch"
            >
              {isLoading ? "Loading..." : "Fetch"}
            </Button>
          </div>
        </div>
      </form>

      {showResults && searchResults.length > 0 && (
        <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-50 p-2" data-testid="search-results">
          <div className="space-y-2">
            {searchResults.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelectResult(result.url)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover-elevate active-elevate-2 text-left"
                data-testid={`search-result-${result.id}`}
              >
                <img
                  src={result.thumbnail}
                  alt={result.title}
                  className="w-32 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">{result.title}</p>
                  {result.duration && (
                    <p className="text-xs text-muted-foreground mt-1">{result.duration}</p>
                  )}
                </div>
                <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        </Card>
      )}

      {error && (
        <p className="text-sm text-destructive mt-2" data-testid="text-search-error">
          {error}
        </p>
      )}
    </div>
  );
}
