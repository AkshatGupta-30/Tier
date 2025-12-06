import React, { memo } from 'react';
import { FaArrowUp } from 'react-icons/fa';

interface EngineSuggestionProps {
  suggestion: string;
  query: string;
  engineName: string;
  engineIcon: string;
  handleSuggestionClick: (suggestion: string, type: 'bookmark' | 'search') => void;
  handleFillQuery: (e: React.MouseEvent, suggestion: string) => void;
}

const EngineSuggestion = ({
  suggestion,
  query,
  engineName,
  engineIcon,
  handleSuggestionClick,
  handleFillQuery,
}: EngineSuggestionProps) => {
  return (
    <li
      onClick={() => handleSuggestionClick(suggestion, 'search')}
      className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-white transition-colors hover:bg-white/10"
    >
      <img
        src={engineIcon}
        alt={engineName}
        className="h-4 w-4"
      />
      <span className="flex-1 truncate text-sm font-medium">
        {(() => {
          const parts = suggestion.split(new RegExp(`(${query})`, 'gi'));
          return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
              <span
                key={i}
                className="text-white"
              >
                {part}
              </span>
            ) : (
              <span
                key={i}
                className="opacity-60"
              >
                {part}
              </span>
            ),
          );
        })()}
      </span>
      <button
        onClick={(e) => handleFillQuery(e, suggestion)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 text-gray-400 group-hover:block hover:bg-white/10 hover:text-white"
        title="Fill in search"
      >
        <FaArrowUp className="h-3 w-3 -rotate-45" />
      </button>
    </li>
  );
};

export default memo(EngineSuggestion);
