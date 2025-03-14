"use client";

import { useRef, useState, useEffect } from "react";
import { TemperatureSection } from "./sections/temperature-section";
import { EmissionsSection } from "./sections/emissions-section";
import { SeaLevelSection } from "./sections/sea-level-section";
import { ActionSection } from "./sections/action-section";
import { ProgressIndicator } from "./progress-indicator";

export function ScrollytellingContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Calculate overall scroll progress
      const scrollProgress =
        (scrollY - containerTop + viewportHeight) / containerHeight;
      setProgress(Math.max(0, Math.min(1, scrollProgress)));

      // Determine active section
      const sectionHeight = containerHeight / 4; // 4 sections
      const currentPosition = scrollY - containerTop + viewportHeight / 2;
      const newActiveSection = Math.floor(currentPosition / sectionHeight);

      if (
        newActiveSection >= 0 &&
        newActiveSection <= 3 &&
        newActiveSection !== activeSection
      ) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div ref={containerRef} className="relative">
      <ProgressIndicator progress={progress} activeSection={activeSection} />

      <TemperatureSection isActive={activeSection === 0} />
      <EmissionsSection isActive={activeSection === 1} />
      <SeaLevelSection isActive={activeSection === 2} />
      <ActionSection isActive={activeSection === 3} />
    </div>
  );
}
