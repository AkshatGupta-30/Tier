import { useRef } from 'react';
import { IoMdCloudUpload, IoMdClose } from 'react-icons/io';

import { UPLOAD_IMAGE_BUTTON } from '@constants/colors';
import { LABELS } from '@constants/label';
import useTheme from '@hooks/useTheme';
import type { BackgroundOption } from '@ts/theme';

const { UPLOAD_IMAGE } = LABELS;

const UploadImageButton = () => {
  const { addCustomBackground } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      addCustomBackground(file);
    }
  };

  return (
    <div
      className={`relative flex h-30 w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-transparent p-1 transition-all duration-300`}
    >
      <button
        className={`relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg ${UPLOAD_IMAGE_BUTTON.classes}`}
        onClick={handleButtonClick}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <IoMdCloudUpload className="text-3xl text-white" />
          <p className={'text-center text-lg font-extrabold text-white'}>{UPLOAD_IMAGE}</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </button>
    </div>
  );
};

const BackgroundImageCard = ({
  isSelected,
  background,
}: {
  isSelected: boolean;
  background: BackgroundOption;
}) => {
  const { value, id } = background;
  const { selectBackgroundImage, removeCustomBackground } = useTheme();

  return (
    <div
      className={`relative flex h-30 w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-1 transition-all duration-300 ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-500/20 dark:border-blue-400 dark:ring-blue-400/20'
          : 'border-transparent hover:border-black/10 dark:hover:border-white/10'
      }`}
    >
      <button
        className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat group-hover:cursor-pointer`}
        style={{ backgroundImage: `url(${value})` }}
        onClick={() => selectBackgroundImage(id)}
      />
      <button
        className="absolute -top-2 -right-2 z-20 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
        onClick={(e) => {
          e.stopPropagation();
          removeCustomBackground(id);
        }}
      >
        <IoMdClose size={16} />
      </button>
    </div>
  );
};

const NoneOptionCard = ({ isSelected }: { isSelected: boolean }) => {
  const { selectBackgroundImage } = useTheme();

  return (
    <div
      className={`relative flex h-30 w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-1 transition-all duration-300 ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-500/20 dark:border-blue-400 dark:ring-blue-400/20'
          : 'border-transparent hover:border-black/10 dark:hover:border-white/10'
      }`}
    >
      <button
        className={`flex h-30 w-full items-center justify-center rounded-lg bg-gray-200 group-hover:cursor-pointer dark:bg-gray-800`}
        onClick={() => selectBackgroundImage(null)}
      >
        <p className="text-center text-lg font-extrabold text-gray-500 dark:text-gray-400">None</p>
      </button>
    </div>
  );
};

const BackgroundImages = () => {
  const { customBackgrounds, selectedImageId } = useTheme();

  const items = [
    { type: 'button', id: 'upload-btn' },
    { type: 'none', id: 'none-option' },
    ...customBackgrounds,
  ];

  return (
    <div className="scrollbar-hidden grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 overflow-y-visible!">
      {items.map((item) => {
        if (item.type === 'button') return <UploadImageButton key={item.id} />;
        if (item.type === 'none')
          return (
            <NoneOptionCard
              key={item.id}
              isSelected={selectedImageId === null}
            />
          );

        return (
          <BackgroundImageCard
            key={item.id}
            background={item as BackgroundOption}
            isSelected={selectedImageId === item.id}
          />
        );
      })}
    </div>
  );
};

export default BackgroundImages;
