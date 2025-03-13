"use client";

import { useState, useEffect } from "react";
import ProductMenuDesktop from "@/component/ProductMenuDesktop";
import ProductMenuMobile from "@/component/ProductMenuMobile";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return <>{isMobile ? <ProductMenuMobile /> : <ProductMenuDesktop />}</>;
}
