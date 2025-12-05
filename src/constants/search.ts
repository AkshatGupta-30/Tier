export enum SearchEngineEnum {
  GOOGLE = 'GOOGLE',
  BING = 'BING',
  DUCKDUCKGO = 'DUCKDUCKGO',
  YAHOO = 'YAHOO',
}

export const SEARCH_ENGINES = {
  [SearchEngineEnum.GOOGLE]: {
    NAME: 'Google',
    URL: 'https://google.com/search',
    QUERY_PARAM: 'q',
    ICON: '/svgs/googleIcon.svg',
    SUGGESTION_URL: 'https://suggestqueries.google.com/complete/search?client=chrome&q=',
  },
  [SearchEngineEnum.BING]: {
    NAME: 'Bing',
    URL: 'https://www.bing.com/search',
    QUERY_PARAM: 'q',
    ICON: '/svgs/bing.svg',
    SUGGESTION_URL: 'https://api.bing.com/osjson.aspx?query=',
  },
  [SearchEngineEnum.DUCKDUCKGO]: {
    NAME: 'DuckDuckGo',
    URL: 'https://duckduckgo.com/',
    QUERY_PARAM: 'q',
    ICON: '/svgs/duckduckgoIcon.svg',
    SUGGESTION_URL: 'https://duckduckgo.com/ac/?type=list&q=',
  },
  [SearchEngineEnum.YAHOO]: {
    NAME: 'Yahoo',
    URL: 'https://search.yahoo.com/search',
    QUERY_PARAM: 'p',
    ICON: '/svgs/yahooIcon.svg',
    SUGGESTION_URL: 'https://search.yahoo.com/sugg/os?command=',
  },
} as const;

export type SearchEngineKey = keyof typeof SEARCH_ENGINES;
