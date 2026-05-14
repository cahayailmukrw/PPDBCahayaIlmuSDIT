'use client';

import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/90 py-10 dark:border-slate-800/70 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">SDIT Cahaya Ilmu</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Sekolah Islam Terpadu dengan visi Islam, karakter, dan kecerdasan global.</p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a href="#hero" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100">
            Kembali ke Atas <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="text-sm text-slate-500 dark:text-slate-400">© 2026 Yayasan Cahaya Abah Ambu</p>
        </div>
      </div>
    </footer>
  );
}
