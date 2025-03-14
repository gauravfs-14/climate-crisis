"use client";

import { useEffect, useState } from "react";

interface ProgressIndicatorProps {
  progress: number;
  activeSection: number;
}

export function ProgressIndicator({
  progress,
  activeSection,
}: ProgressIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(progress > 0 && progress < 1);
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col items-center gap-8">
        <div className="h-48 w-1 bg-gray-700 rounded-full relative">
          <div
            className="absolute top-0 left-0 w-full bg-blue-400 rounded-full transition-all duration-300"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <a
            href="#temperature"
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === 0
                ? "bg-blue-400 scale-125"
                : "bg-gray-600 hover:bg-gray-400"
            }`}
          >
            <span className="sr-only">Temperature Section</span>
          </a>
          <a
            href="#emissions"
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === 1
                ? "bg-blue-400 scale-125"
                : "bg-gray-600 hover:bg-gray-400"
            }`}
          >
            <span className="sr-only">Emissions Section</span>
          </a>
          <a
            href="#sea-level"
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === 2
                ? "bg-blue-400 scale-125"
                : "bg-gray-600 hover:bg-gray-400"
            }`}
          >
            <span className="sr-only">Sea Level Section</span>
          </a>
          <a
            href="#action"
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === 3
                ? "bg-blue-400 scale-125"
                : "bg-gray-600 hover:bg-gray-400"
            }`}
          >
            <span className="sr-only">Action Section</span>
          </a>
        </div>
      </div>
    </div>
  );
}
