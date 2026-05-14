'use client';

import { motion } from 'framer-motion';
import { Moon, SunMedium, Phone, BookOpen, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Tentang', href: '#about' },
  { label: 'Program', href: '#program' },
  { label: 'Fasilitas', href: '#facilities' },
  { label: 'Alur PPDB', href: '#timeline' },
  { label: 'Daftar', href: '#register' },
  { label: 'Kontak', href: '#contact' }
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur-xl dark:bg-slate-950/75 border-b border-slate-200/70 dark:border-slate-800/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-glow">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">SDIT Cahaya Ilmu</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">PPDB 2026/2027</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-emerald-700 dark:text-slate-200 dark:hover:text-emerald-300">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full border border-slate-200 bg-white/90 p-2 text-slate-700 shadow-sm transition hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          <a href="#register" className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:shadow-emerald-700/40">
            <BookOpen className="h-4 w-4" /> Daftar Sekarang
          </a>
          <a href="https://wa.me/6281234567890" className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 md:inline-flex">
            <Phone className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
