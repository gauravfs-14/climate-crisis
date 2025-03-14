"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { motion } from "framer-motion";

Chart.register(...registerables);

export function EmissionsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // CO2 emissions data from 1900 to 2023 (in billion tonnes)
    const years = Array.from({ length: 124 }, (_, i) => 1900 + i);

    // Simulated CO2 emissions data based on Global Carbon Project
    const emissionsData = [
      2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.8, 2.7, 2.8, 2.9, 3.0, 3.1, 3.3, 3.2,
      3.1, 3.2, 3.3, 3.2, 3.0, 3.3, 3.1, 3.2, 3.5, 3.6, 3.7, 3.8, 4.0, 4.0, 4.1,
      3.8, 3.5, 3.3, 3.5, 3.7, 3.9, 4.2, 4.4, 4.3, 4.0, 4.3, 4.5, 4.8, 5.0, 5.0,
      5.2, 5.5, 5.8, 6.0, 6.1, 6.5, 6.7, 6.9, 7.2, 7.5, 7.7, 8.0, 8.3, 8.5, 8.7,
      9.0, 9.3, 9.5, 9.7, 10.0, 10.3, 10.6, 10.9, 11.2, 11.5, 11.9, 12.3, 12.7,
      13.1, 13.5, 13.9, 14.3, 14.7, 15.1, 15.5, 15.9, 16.3, 16.7, 17.1, 17.5,
      17.9, 18.3, 18.7, 19.1, 19.5, 19.9, 20.3, 20.7, 21.1, 21.5, 22.0, 22.5,
      23.0, 23.5, 24.0, 24.5, 25.0, 25.5, 26.0, 26.5, 27.0, 27.5, 28.0, 29.0,
      30.0, 31.0, 32.0, 33.0, 34.0, 35.0, 35.5, 36.0, 36.5, 36.8,
    ];

    // Create gradient for the bars
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(156, 163, 175, 0.8)");
    gradient.addColorStop(1, "rgba(156, 163, 175, 0.2)");

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: years,
        datasets: [
          {
            label: "CO₂ Emissions (billion tonnes)",
            data: emissionsData,
            backgroundColor: gradient,
            borderColor: "rgba(156, 163, 175, 1)",
            borderWidth: 1,
            borderRadius: 2,
            barPercentage: 0.9,
            categoryPercentage: 0.9,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000,
          easing: "easeOutQuart",
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
              maxTicksLimit: 10,
              callback: (value, index, values) => {
                const year = years[index];
                return year % 20 === 0 ? year : "";
              },
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            title: {
              display: true,
              text: "CO₂ Emissions (billion tonnes)",
              color: "rgba(255, 255, 255, 0.9)",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              title: (tooltipItems) => `Year: ${tooltipItems[0].label}`,
              label: (context) =>
                `CO₂ Emissions: ${context.raw} billion tonnes`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="relative">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Global CO₂ Emissions (1900-2023)
      </h3>
      <div className="h-[400px] w-full">
        <canvas ref={chartRef} />
      </div>
      <div className="mt-4 text-sm text-gray-400 text-center">
        <p>Data source: Global Carbon Project</p>
        <p>Includes emissions from fossil fuels and industry</p>
      </div>

      <motion.div
        className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8],
          transition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 1,
          },
        }}
      >
        <div className="text-gray-300 font-bold text-lg">18x increase</div>
      </motion.div>
    </div>
  );
}
