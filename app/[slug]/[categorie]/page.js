"use client";

import { useState, useEffect } from "react";
import ProductCategorieDesktop from "@/component/ProductCategorieDesktop";
import ProductCategorieMobile from "@/component/ProductCategorieMobile";

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

  return <>{isMobile ? <ProductCategorieMobile /> : <ProductCategorieDesktop />}</>;
}
