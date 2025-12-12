import NewTabPreview from '@components/NewTabPreview';
import Slider from '@components/Slider';
import useTheme from '@hooks/useTheme';

const FilterSettings = () => {
  const { backgroundBlur, backgroundOverlay, updateBackgroundBlur, updateBackgroundOverlay } =
    useTheme();

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-hidden p-1 lg:flex-row lg:gap-4">
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex w-[250px] flex-col gap-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
          <div>
            <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
              Background Effects
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Customize the look of your background image.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <Slider
              label="Blur"
              value={backgroundBlur}
              onChange={updateBackgroundBlur}
              min={0}
              max={20}
              unit="px"
            />

            <Slider
              label="Overlay"
              value={backgroundOverlay}
              onChange={updateBackgroundOverlay}
              min={0}
              max={100}
              unit="%"
            />
          </div>
        </div>
      </div>

      <NewTabPreview open={true} />
    </div>
  );
};

export default FilterSettings;
