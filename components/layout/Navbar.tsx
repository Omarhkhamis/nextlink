'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import navData from '@/data/navigation.json';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-brand-blue/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-[50px] w-[50px]">
              <img
                src="/logo.svg"
                alt="Next link logo"
                className="h-[50px] w-[50px] object-contain"
              />
              <div className="absolute inset-0 blur-xl bg-brand-blue/20 group-hover:bg-brand-green/20 transition-all" />
            </div>
            <span className="text-2xl font-bold text-white">
              {navData.logo.text.replace(navData.logo.highlight, '')}
              <span className="text-brand-blue">{navData.logo.highlight}</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navData.navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-brand-blue hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href={navData.ctaButton.href}>
              <Button className="ml-4 bg-brand-blue hover:bg-brand-green text-black font-semibold transition-all hover:shadow-lg hover:shadow-brand-green/50">
                {navData.ctaButton.text}
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-brand-blue transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navData.navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-brand-blue hover:bg-white/5"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href={navData.ctaButton.href} onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-brand-blue hover:bg-brand-green text-black font-semibold mt-4">
                {navData.ctaButton.text}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
