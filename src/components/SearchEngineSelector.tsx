import { SEARCH_ENGINES, type SearchEngineKey } from '@constants/search';
import { useAppDispatch, useAppSelector } from '@store';
import { setSearchEngine } from '@store/slices/search';

const SearchEngineSelector = () => {
  const dispatch = useAppDispatch();
  const selectedEngine = useAppSelector((state) => state.search.selectedEngine);

  const handleSelect = (engine: SearchEngineKey) => {
    dispatch(setSearchEngine(engine));
  };

  return (
    <div className="flex w-full flex-row flex-wrap gap-3">
      {(Object.keys(SEARCH_ENGINES) as SearchEngineKey[]).map((engineKey) => {
        const engine = SEARCH_ENGINES[engineKey];
        const Icon = engine.ICON;
        const isSelected = selectedEngine === engineKey;

        return (
          <button
            key={engineKey}
            onClick={() => handleSelect(engineKey)}
            className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-all duration-300 ${
              isSelected
                ? 'border-blue-500 bg-blue-500/10 dark:border-blue-400 dark:bg-blue-400/10'
                : 'border-transparent bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10'
            }`}
          >
            <img src={Icon} alt={engine.NAME} className="h-8 w-8" />
            <span
              className={`text-sm font-medium ${
                isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {engine.NAME}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SearchEngineSelector;
