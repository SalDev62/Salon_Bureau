"use client";

import { useState, useEffect } from "react";
import ProductProduitDesktop from "@/component/ProductProduitDesktop";
import ProductProduitMobile from "@/component/ProductProduitMobile";

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

  return <>{isMobile ? <ProductProduitMobile /> : <ProductProduitDesktop />}</>;
}
