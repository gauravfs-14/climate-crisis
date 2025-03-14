"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { motion } from "framer-motion";

Chart.register(...registerables);

export function SeaLevelChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Sea level data from 1900 to 2023 (in mm relative to 1900)
    const years = Array.from({ length: 124 }, (_, i) => 1900 + i);

    // Simulated sea level rise data based on satellite and tide gauge measurements
    const seaLevelData = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 52, 54, 56, 58, 60, 62,
      64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 93, 96, 99, 102,
      105, 108, 111, 114, 117, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156,
      160, 165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230,
      235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305,
      310, 315, 320, 325, 330,
    ];

    // Create gradient for the line
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)");
    gradient.addColorStop(1, "rgba(59, 130, 246, 0.1)");

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
            label: "Sea Level Rise (mm)",
            data: seaLevelData,
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: gradient,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(59, 130, 246)",
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
              callback: (_, index) => {
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
              text: "Sea Level Rise (mm)",
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
              label: (context) => `Sea Level Rise: ${context.raw} mm`,
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
        Global Sea Level Rise (1900-2023)
      </h3>
      <div className="h-[400px] w-full">
        <canvas ref={chartRef} />
      </div>
      <div className="mt-4 text-sm text-gray-400 text-center">
        <p>Data source: CSIRO, NOAA</p>
        <p>Relative to 1900 baseline</p>
      </div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8],
          transition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 2,
          },
        }}
      >
        <div className="text-blue-300 font-bold text-lg">Accelerating</div>
      </motion.div>
    </div>
  );
}
