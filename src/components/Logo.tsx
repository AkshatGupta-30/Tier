import { type CSSProperties, type FC } from 'react';

interface TierLogoProps {
  size?: CSSProperties['width'];
  className?: string;
}


const TierLogo: FC<TierLogoProps> = ({ size = 480, className = '' }) => {
  return (
    <img
      src="/images/tier.png"
      alt="Tier Logo"
      width={size}
      height={size}
      className={className}
    />
  );
};

export default TierLogo;
