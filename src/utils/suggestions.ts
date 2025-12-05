import { SEARCH_ENGINES, type SearchEngineKey } from '@constants/search';

export const fetchSuggestions = async (
  query: string,
  engineKey: SearchEngineKey,
): Promise<string[]> => {
  if (!query.trim()) return [];

  const engine = SEARCH_ENGINES[engineKey];
  const suggestionUrl = `${engine.SUGGESTION_URL}${encodeURIComponent(query)}`;

  try {
    const response = await fetch(suggestionUrl);
    const data = await response.json();

    switch (engineKey) {
      case 'GOOGLE':
      case 'BING':
      case 'YAHOO':
        // Format: [query, [suggestion1, suggestion2, ...]]
        return data[1] || [];
      case 'DUCKDUCKGO':
        // Format: [{phrase: "suggestion1"}, {phrase: "suggestion2"}, ...]
        // Note: The simple API returns a list of objects if type=list isn't fully respected or differs
        // Let's assume standard behavior for now, but handle list of objects if needed.
        // Actually DDG 'type=list' usually returns [ { phrase: '...' }, ... ]
        if (Array.isArray(data)) {
          return data.map((item: any) => item.phrase || item);
        }
        return [];
      default:
        return [];
    }
  } catch (error) {
    console.error(`Error fetching suggestions for ${engine.NAME}:`, error);
    return [];
  }
};
