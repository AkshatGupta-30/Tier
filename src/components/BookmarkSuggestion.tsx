import { memo } from "react";

interface BookmarkSuggestionProps {
  suggestion: chrome.bookmarks.BookmarkTreeNode;
  handleSuggestionClick: (suggestion: string, type: 'bookmark' | 'search') => void;
}

const BookmarkSuggestion = ({ suggestion, handleSuggestionClick }: BookmarkSuggestionProps) => {
  return (
    <div
      onClick={() => handleSuggestionClick(suggestion.url ?? '', 'bookmark')}
      className="flex max-w-[150px] shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-white transition-colors hover:bg-white/10"
      title={suggestion.title}
    >
      <span className="shrink-0 text-base">⭐</span>
      <span className="truncate text-xs font-medium">{suggestion.title}</span>
    </div>
  );
};

export default memo(BookmarkSuggestion);
