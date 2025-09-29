"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { searchItems, getRecentSearches, saveRecentSearch, clearRecentSearches, getPopularSearchTerms } from "@/lib/search";
import { SearchItem } from "@/lib/search-index";
import { 
  Search, 
  FileText, 
  BookOpen, 
  FlaskConical, 
  GraduationCap, 
  User,
  Clock,
  Star,
  X,
  History
} from "lucide-react";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getItemIcon = (type: SearchItem['type']) => {
  switch (type) {
    case 'cheatsheet':
      return <FileText className="h-4 w-4 text-orange-500" />;
    case 'deep-dive':
      return <BookOpen className="h-4 w-4 text-purple-500" />;
    case 'lab':
      return <FlaskConical className="h-4 w-4 text-green-500" />;
    case 'track':
      return <GraduationCap className="h-4 w-4 text-blue-500" />;
    case 'user':
      return <User className="h-4 w-4 text-gray-500" />;
    default:
      return <Search className="h-4 w-4 text-gray-500" />;
  }
};

const getItemPath = (item: SearchItem): string => {
  switch (item.type) {
    case 'cheatsheet':
      return `/cheatsheets/${item.slug}`;
    case 'deep-dive':
      return `/deep-dives/${item.slug}`;
    case 'lab':
      return `/labs/${item.slug}`;
    case 'track':
      return `/tracks/${item.slug}`;
    case 'user':
      return `/profile/${item.slug}`;
    default:
      return '/';
  }
};

const getTypeLabel = (type: SearchItem['type']): string => {
  switch (type) {
    case 'cheatsheet':
      return 'Cheatsheets';
    case 'deep-dive':
      return 'Deep Dives';
    case 'lab':
      return 'Labs';
    case 'track':
      return 'Tracks';
    case 'user':
      return 'Users';
    default:
      return 'Other';
  }
};

const highlightMatch = (text: string, query: string): string => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<strong>$1</strong>');
};

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularTerms, setPopularTerms] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setRecentSearches(getRecentSearches());
      setPopularTerms(getPopularSearchTerms());
    }
  }, [open]);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchItems(query, 20);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    const path = getItemPath(item);
    saveRecentSearch(query);
    router.push(path);
    onOpenChange(false);
    setQuery("");
  };

  const handleRecentSearch = (term: string) => {
    setQuery(term);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  // Group results by type
  const groupedResults = results.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  const typeOrder: SearchItem['type'][] = ['cheatsheet', 'deep-dive', 'lab', 'track', 'user'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search cheatsheets, labs, deep dives, tracks, and users..."
            value={query}
            onValueChange={setQuery}
            className="h-12"
          />
          <CommandList className="max-h-[60vh] overflow-y-auto">
            {query.trim() && results.length === 0 && (
              <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                <div className="space-y-2">
                  <Search className="h-8 w-8 text-gray-300 mx-auto" />
                  <p>No results found for "{query}"</p>
                  <p className="text-xs text-gray-400">Try a different search term</p>
                </div>
              </CommandEmpty>
            )}
            
            {query.trim() && results.length > 0 && (
              <>
                {typeOrder.map((type) => {
                  const items = groupedResults[type];
                  if (!items || items.length === 0) return null;
                  
                  return (
                    <CommandGroup key={type} heading={getTypeLabel(type)}>
                      {items.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.title}
                          onSelect={() => handleSelect(item)}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                        >
                          {getItemIcon(item.type)}
                          <div className="flex-1 min-w-0">
                            <div 
                              className="font-medium truncate"
                              dangerouslySetInnerHTML={{
                                __html: highlightMatch(item.title, query)
                              }}
                            />
                            {item.description && (
                              <div className="text-sm text-gray-500 truncate">
                                {item.description}
                              </div>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {item.type}
                          </Badge>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  );
                })}
              </>
            )}

            {!query.trim() && (
              <div className="py-6">
                <div className="text-center mb-6">
                  <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Search across all content and users
                  </p>
                </div>
                
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="px-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <History className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Recent searches</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearRecent}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleRecentSearch(term)}
                          className="text-xs h-7"
                        >
                          {term}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Search Terms */}
                <div className="px-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Popular searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularTerms.map((term, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleRecentSearch(term)}
                        className="text-xs h-7"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Help Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="font-medium">Try searching for:</div>
                    <div>• "cache" - Caching patterns</div>
                    <div>• "rate" - Rate limiter lab</div>
                    <div>• "instagram" - Instagram feed</div>
                    <div>• "beginner" - Learning tracks</div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="font-medium">Keyboard shortcuts:</div>
                    <div>• <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">⌘K</kbd> - Open search</div>
                    <div>• <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> - Close search</div>
                    <div>• <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">↑↓</kbd> - Navigate</div>
                    <div>• <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> - Select</div>
                  </div>
                </div>
              </div>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
