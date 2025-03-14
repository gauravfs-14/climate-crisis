"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { EmissionsChart } from "../charts/emissions-chart";

interface EmissionsSectionProps {
  isActive: boolean;
}

export function EmissionsSection({ isActive }: EmissionsSectionProps) {
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
      id="emissions"
      className="min-h-screen flex items-center relative py-24"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 to-gray-950 z-0" />

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
            }}
            className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800 order-2 lg:order-1"
          >
            <EmissionsChart />
          </motion.div>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.3 },
              },
            }}
            className="space-y-6 order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              CO<sub>2</sub> Emissions{" "}
              <span className="text-gray-400">Skyrocketing</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-xl">
              Human activities have increased carbon dioxide emissions, reaching
              levels higher than any point in at least the past 800,000 years.
            </p>
            <div className="space-y-4 text-gray-300">
              <div className="flex gap-3">
                <div className="w-1 bg-gray-500 rounded-full flex-shrink-0" />
                <p>
                  <strong className="text-white">36.8 billion tonnes</strong> of
                  CO<sub>2</sub> were emitted globally in 2023, primarily from
                  burning fossil fuels.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1 bg-gray-500 rounded-full flex-shrink-0" />
                <p>
                  CO<sub>2</sub> concentration in the atmosphere has increased
                  by{" "}
                  <strong className="text-white">
                    50% since pre-industrial times
                  </strong>
                  , from 280 ppm to over 420 ppm today.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1 bg-gray-500 rounded-full flex-shrink-0" />
                <p>
                  To limit warming to 1.5°C, global emissions need to be{" "}
                  <strong className="text-white">reduced by 45% by 2030</strong>{" "}
                  and reach net zero by 2050.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
