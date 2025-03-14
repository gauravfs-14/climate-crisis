"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { SeaLevelChart } from "../charts/sea-level-chart";

interface SeaLevelSectionProps {
  isActive: boolean;
}

export function SeaLevelSection({ isActive }: SeaLevelSectionProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView || isActive) {
      controls.start("visible");
    }
  }, [controls, isInView, isActive]);

  return (
    <section
      id="sea-level"
      className="min-h-screen flex items-center relative py-24"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-blue-950/30 z-0" />

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Sea Levels <span className="text-blue-400">Rising</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-xl">
              Global sea levels are rising at an accelerating rate due to
              melting ice sheets and glaciers, as well as the thermal expansion
              of warming ocean waters.
            </p>
            <div className="space-y-4 text-gray-300">
              <div className="flex gap-3">
                <div className="w-1 bg-blue-500 rounded-full flex-shrink-0" />
                <p>
                  Global sea level has risen by{" "}
                  <strong className="text-white">
                    about 21-24 cm (8-9 inches)
                  </strong>{" "}
                  since 1880, with a third of that occurring in just the last 25
                  years.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1 bg-blue-500 rounded-full flex-shrink-0" />
                <p>
                  The rate of sea level rise has{" "}
                  <strong className="text-white">
                    doubled from 1.4 mm per year to 3.6 mm per year
                  </strong>{" "}
                  in the last century.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1 bg-blue-500 rounded-full flex-shrink-0" />
                <p>
                  By 2100, global sea level is projected to rise{" "}
                  <strong className="text-white">
                    between 0.3 and 1.0 meters (1-3 feet)
                  </strong>
                  , threatening coastal communities worldwide.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, delay: 0.3 },
              },
            }}
            className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
          >
            <SeaLevelChart />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
