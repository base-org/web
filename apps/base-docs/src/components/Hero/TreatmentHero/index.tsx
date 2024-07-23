import React, { useEffect, useState } from 'react';

import DesktopHero from './DesktopHero';
import MobileHero from './MobileHero';

export default function TreatmentHero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  if (windowWidth <= 500) {
    return <MobileHero />;
  }
  return <DesktopHero />;
}
