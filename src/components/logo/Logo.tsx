import { type FC } from 'react';

interface TierLogoProps {
  size?: number;
  className?: string;
}

const glassClass =
  'absolute bg-white/20 backdrop-blur-[10px] backdrop-saturate-[140%] rounded-[1.25rem] shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-white/20';

const TierLogo: FC<TierLogoProps> = ({ size = 480, className = '' }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`relative aspect-square w-[${size}px] rounded-[10%] bg-[radial-gradient(circle_at_top_left,#2a4ab6,#872da6_125%,#6a1d8a)] p-[10%] ${className}`}
        aria-label="Tier Logo"
        role="img"
      >
        <div className={`${glassClass} w-[52%] h-[46.875%] top-[38.5%] left-[36.5%] z-0`} />
        <div className={`${glassClass} w-[46.875%] h-[46.875%] top-[13.5%] left-[10.42%] z-1`} />
        <div className={`${glassClass} w-[26%] h-[46.875%] top-[13.5%] left-[62.5%] z-1`} />
        <div className={`${glassClass} w-[52%] h-[20.8%] top-[64.6%] left-[36.5%] z-1`} />
      </div>
    </div>
  );
};

export default TierLogo;
