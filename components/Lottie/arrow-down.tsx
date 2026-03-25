"use client";

import Lottie from "lottie-react";
import arrowDown from "@/public/animations/arrow-down.json";
import { useEffect, useState } from "react";

export default function ScrollArrow() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    fetch("/animations/arrow-down.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  if (!animationData) return null;

  return (
    <div className="w-6 h-6 mx-auto">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}
