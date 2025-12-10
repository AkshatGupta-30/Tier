import { useEffect, useRef, useState } from 'react';
import NewTab from '@pages/NewTab';

const NewTabPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newScale = containerWidth / screenWidth;
        setScale(newScale);
      }
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [screenWidth]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700"
      style={{ aspectRatio: `${screenWidth} / ${screenHeight}` }}
      ref={containerRef}
    >
      <div
        className="pointer-events-none origin-top-left overflow-hidden select-none"
        style={{
          width: screenWidth,
          height: screenHeight,
          transform: `scale(${scale})`,
        }}
        inert
      >
        <NewTab />
      </div>

      <div className="pointer-events-none absolute inset-0 z-50 rounded-lg" />
    </div>
  );
};

export default NewTabPreview;
