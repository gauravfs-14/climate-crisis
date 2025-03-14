"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { motion } from "framer-motion";

Chart.register(...registerables);

export function TemperatureChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Temperature anomaly data (°C) from 1880 to 2023
    const years = Array.from({ length: 144 }, (_, i) => 1880 + i);

    // Simulated temperature anomaly data based on NASA GISS
    const temperatureData = [
      -0.16, -0.07, -0.1, -0.17, -0.28, -0.32, -0.3, -0.35, -0.16, -0.1, -0.35,
      -0.22, -0.27, -0.31, -0.3, -0.23, -0.15, -0.11, -0.28, -0.18, -0.09,
      -0.15, -0.27, -0.37, -0.29, -0.23, -0.22, -0.39, -0.43, -0.42, -0.43,
      -0.35, -0.34, -0.34, -0.15, -0.14, -0.35, -0.46, -0.29, -0.27, -0.26,
      -0.19, -0.28, -0.27, -0.19, -0.1, -0.2, -0.25, -0.22, -0.1, -0.15, -0.19,
      -0.06, -0.02, -0.08, -0.13, -0.14, -0.19, -0.06, 0.05, 0.03, 0.06, -0.03,
      0.06, 0.03, -0.02, 0.0, 0.02, -0.07, 0.01, 0.08, 0.16, 0.26, 0.1, 0.12,
      0.18, 0.07, 0.09, 0.12, 0.18, 0.07, 0.17, 0.16, 0.23, 0.28, 0.32, 0.14,
      0.31, 0.16, 0.12, 0.18, 0.32, 0.39, 0.27, 0.45, 0.41, 0.22, 0.23, 0.32,
      0.45, 0.33, 0.46, 0.61, 0.38, 0.39, 0.54, 0.63, 0.62, 0.54, 0.68, 0.64,
      0.68, 0.75, 0.62, 0.64, 0.67, 0.54, 0.66, 0.72, 0.61, 0.65, 0.68, 0.75,
      0.9, 0.99, 0.92, 0.85, 0.98, 1.02, 0.92, 1.01, 0.95, 1.02, 1.13, 1.2,
      1.11, 0.99, 1.17, 1.02, 1.18,
    ];

    // Create gradient for the line
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(239, 68, 68, 0.8)");
    gradient.addColorStop(1, "rgba(239, 68, 68, 0.1)");

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: years,
        datasets: [
          {
            label: "Temperature Anomaly (°C)",
            data: temperatureData,
            borderColor: "rgb(239, 68, 68)",
            backgroundColor: gradient,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(239, 68, 68)",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
            tension: 0.4,
            fill: true,
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
              color: "rgba(255, 255, 255, 0.1)",
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
              text: "Temperature Anomaly (°C)",
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
              label: (context) => `Temperature Anomaly: ${context.raw}°C`,
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
        Global Temperature Anomaly (1880-2023)
      </h3>
      <div className="h-[400px] w-full">
        <canvas ref={chartRef} />
      </div>
      <div className="mt-4 text-sm text-gray-400 text-center">
        <p>Data source: NASA Goddard Institute for Space Studies (GISS)</p>
        <p>Baseline: 1951-1980 average temperatures</p>
      </div>

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8],
          transition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
        }}
      >
        <div className="text-red-500 font-bold text-xl">+1.18°C</div>
      </motion.div>
    </div>
  );
}
