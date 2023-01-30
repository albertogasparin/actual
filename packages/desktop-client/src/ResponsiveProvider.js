import React, { useContext, useEffect, useState } from 'react';

import tokens from 'loot-design/src/tokens';

export function isMobile(width) {
  // Simple detection: if the screen width is too small
  const containerWidth = width || window.innerWidth;
  return containerWidth < parseInt(tokens.breakpoint_medium);
}

function getWidthName(width) {
  const medPx = parseInt(tokens.breakpoint_medium);
  const widePx = parseInt(tokens.breakpoint_wide);

  return width < medPx
    ? 'narrow'
    : width >= medPx && width < widePx
    ? 'medium'
    : 'wide';
}

let ResponsiveContext = React.createContext(undefined);
export function ResponsiveProvider({ children }) {
  const [viewportWidthName, setViewportWidthName] = useState(
    getWidthName(window.innerWidth)
  );

  useEffect(() => {
    const updateViewportWidth = () => {
      console.log(viewportWidthName);
      if (getWidthName(window.innerWidth) !== viewportWidthName) {
        console.log('Viewport is now', getWidthName(window.innerWidth));
        setViewportWidthName(getWidthName(window.innerWidth));
      }
    };

    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  return (
    <ResponsiveContext.Provider value={viewportWidthName}>
      {children}
    </ResponsiveContext.Provider>
  );
}
export const VWIDTHS = {
  NARROW: 'narrow',
  MEDIUM: 'medium',
  WIDE: 'wide'
};

export function useViewportWidth() {
  return useContext(ResponsiveContext);
}
