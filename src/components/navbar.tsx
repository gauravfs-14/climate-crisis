"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <span className="text-blue-400">Climate</span>
            <span>Crisis</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#temperature"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Temperature Rise
            </Link>
            <Link
              href="#emissions"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              CO₂ Emissions
            </Link>
            <Link
              href="#sea-level"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Sea Level Rise
            </Link>
            <Link
              href="#action"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Take Action
            </Link>
          </nav>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/95 absolute top-full left-0 right-0 border-t border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="#temperature"
                className="text-gray-300 hover:text-white py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Temperature Rise
              </Link>
              <Link
                href="#emissions"
                className="text-gray-300 hover:text-white py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                CO₂ Emissions
              </Link>
              <Link
                href="#sea-level"
                className="text-gray-300 hover:text-white py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sea Level Rise
              </Link>
              <Link
                href="#action"
                className="text-gray-300 hover:text-white py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Take Action
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
