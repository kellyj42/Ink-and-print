"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[hsl(0,0%,7%)]  shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex flex-col justify-center items-center">
          <Image
            src="/logoimg.png"
            alt="INK & APPARELS Logo"
            width={80}
            height={50}
            className="object-contain"
          />
          <div className="text-center text-xs ">
            <h1
              className="font-extrabold"
              style={{
                background:
                  "linear-gradient(to right, hsl(355, 82%, 56%), hsl(24, 95%, 53%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              INK & APPARELS
            </h1>
            <p
              className="text-white text-xs font-medium tracking-wide italic"
              style={{ fontFamily: "'Poppins', 'Arial', sans-serif" }}
            >
              your quality and creative place
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-[hsl(0,0%,100%)]">
          <li>
            <Link href="/" className="hover:text-[hsl(355,82%,56%)] transition">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-[hsl(355,82%,56%)] transition"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="hover:text-[hsl(355,82%,56%)] transition"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/order"
              className="hover:text-[hsl(355,82%,56%)] transition"
            >
              Order
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-[hsl(355,82%,56%)] transition"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Dark Mode Toggle */}

          {/* CTA Button */}
          <Link
            href="/order"
            className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] hover:opacity-90 transition"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-[hsl(0,0%,7%)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[hsl(0,0%,100%)] border-t border-[hsl(0,0%,95%)] px-4 py-4 space-y-4 text-[hsl(0,0%,7%)]">
          <Link href="/" className="block hover:text-[hsl(355,82%,56%)]">
            Home
          </Link>
          <Link
            href="/products"
            className="block hover:text-[hsl(355,82%,56%)]"
          >
            Products
          </Link>
          <Link
            href="/services"
            className="block hover:text-[hsl(355,82%,56%)]"
          >
            Services
          </Link>
          <Link href="/order" className="block hover:text-[hsl(355,82%,56%)]">
            Order
          </Link>
          <Link href="/contact" className="block hover:text-[hsl(355,82%,56%)]">
            Contact
          </Link>

          <Link
            href="/order"
            className="block text-center py-2 rounded-lg text-white bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)]"
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  );
}
