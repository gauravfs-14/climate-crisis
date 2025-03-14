"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf, Zap, Recycle, Users } from "lucide-react";

interface ActionSectionProps {
  isActive: boolean;
}

export function ActionSection({ isActive }: ActionSectionProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView || isActive) {
      controls.start("visible");
    }
  }, [controls, isInView, isActive]);

  const actionCards = [
    {
      title: "Reduce Energy Use",
      description:
        "Switch to renewable energy sources and improve energy efficiency in your home and transportation.",
      icon: <Zap className="h-12 w-12 text-yellow-400" />,
      link: "https://www.un.org/en/actnow/ten-actions",
    },
    {
      title: "Sustainable Consumption",
      description:
        "Choose sustainable products, reduce waste, and adopt a more plant-based diet to lower your carbon footprint.",
      icon: <Recycle className="h-12 w-12 text-green-400" />,
      link: "https://www.un.org/en/actnow/ten-actions",
    },
    {
      title: "Protect Nature",
      description:
        "Support conservation efforts, plant trees, and help protect and restore natural ecosystems.",
      icon: <Leaf className="h-12 w-12 text-emerald-400" />,
      link: "https://www.conservation.org/act",
    },
    {
      title: "Advocate for Change",
      description:
        "Use your voice and vote to support climate policies and encourage others to take action.",
      icon: <Users className="h-12 w-12 text-blue-400" />,
      link: "https://www.un.org/en/climatechange/climate-solutions",
    },
  ];

  return (
    <section
      id="action"
      className="min-h-screen flex items-center relative py-24"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-green-950/30 z-0" />

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Take <span className="text-green-400">Action</span> Now
          </h2>
          <p className="text-xl text-gray-300">
            Climate change is a global challenge, but each of us can be part of
            the solution. Here are some ways you can make a difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actionCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.2 + index * 0.1,
                  },
                },
              }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border border-gray-800 h-full flex flex-col">
                <CardHeader>
                  <div className="mb-4">{card.icon}</div>
                  <CardTitle className="text-xl text-gray-200">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8, delay: 0.8 } },
          }}
          className="mt-16 text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <a
              href="https://www.un.org/en/actnow"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Global Movement
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
