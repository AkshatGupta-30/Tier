import { memo, type ChangeEvent } from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  unit?: string;
}

const Slider = ({ label, value, min, max, onChange, unit = '' }: SliderProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600 outline-none hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      />
    </div>
  );
};

export default memo(Slider);
