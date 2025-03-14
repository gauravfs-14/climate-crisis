"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { TemperatureChart } from "../charts/temperature-chart";

interface TemperatureSectionProps {
  isActive: boolean;
}

export function TemperatureSection({ isActive }: TemperatureSectionProps) {
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
      id="temperature"
      className="min-h-screen flex items-center relative py-24"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black to-red-950/30 z-0" />

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
              Global Temperature <span className="text-red-400">Rising</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-xl">
              Earth&apos;s average temperature has increased by more than 1.1°C
              since pre-industrial times, with the last decade being the warmest
              on record.
            </p>
            <div className="space-y-4 text-gray-300">
              <div className="flex gap-3">
                <div className="w-1 bg-red-500 rounded-full flex-shrink-0" />
                <p>
                  <strong className="text-white">
                    2023 was the hottest year on record
                  </strong>
                  , with global temperatures 1.18°C above the pre-industrial
                  average.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1 bg-red-500 rounded-full flex-shrink-0" />
                <p>
                  The{" "}
                  <strong className="text-white">
                    rate of warming has doubled
                  </strong>{" "}
                  in the last 40 years compared to the previous century.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1 bg-red-500 rounded-full flex-shrink-0" />
                <p>
                  If current trends continue, we could see{" "}
                  <strong className="text-white">
                    warming of 2.7°C by 2100
                  </strong>
                  , far exceeding the Paris Agreement goal of 1.5°C.
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
            <TemperatureChart />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
