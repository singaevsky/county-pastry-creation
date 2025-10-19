import { useState, useEffect } from "react";
import EnhancedCatalogGrid from "./EnhancedCatalogGrid";
import MobileCatalogGrid from "./MobileCatalogGrid";

const ResponsiveCatalogGrid = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile ? <MobileCatalogGrid /> : <EnhancedCatalogGrid />;
};

export default ResponsiveCatalogGrid;
