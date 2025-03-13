"use client";

import { useState, useEffect } from "react";
import ProductAllPageMobile from "@/component/ProductAllPageMobile";
import ProduitsPage from "@/component/ProductAllPageDesktop";

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

  return <>{isMobile ? <ProductAllPageMobile /> : <ProduitsPage />}</>;
}
