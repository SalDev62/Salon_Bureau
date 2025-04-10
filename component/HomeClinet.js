"use client";

import { useState, useEffect } from "react";
import HomePageDesktop from "@/component/HomePageDesktop";
import HomePageMobile from "@/component/HomePageMobile";

export default function HomeClient() {
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

  return <>{isMobile ? <HomePageMobile /> : <HomePageDesktop />}</>;
}
