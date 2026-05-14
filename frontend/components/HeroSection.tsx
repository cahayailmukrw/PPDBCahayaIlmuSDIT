'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Download, ScrollText, Sparkles, Users } from 'lucide-react';

const stats = [
  { label: 'Kuota Siswa', value: '75' },
  { label: 'Rombel', value: '3' },
  { label: 'Tahfidz', value: '1-5 Juz' },
  { label: 'Lingkungan', value: 'Ramah Anak' }
];

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-6 pt-28 pb-16 text-slate-900 dark:text-slate-100 lg:px-8">
      <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_52%)]" />
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm dark:border-emerald-700/30 dark:bg-emerald-900/20 dark:text-emerald-200">
            <Sparkles className="h-4 w-4" /> PPDB Terbuka untuk Generasi Islami
          </span>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-6xl">
            PPDB SDIT Cahaya Ilmu 2026/2027
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            Sekolah Islam Terpadu modern yang membentuk generasi Qurani, cerdas, berkarakter, dan berwawasan global.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#register" className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-emerald-700/30 transition hover:bg-emerald-800">
              Daftar Sekarang
            </a>
            <a href="/brosur.pdf" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-6 py-3 text-base font-semibold text-slate-900 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100">
              <Download className="h-4 w-4" /> Download Brosur
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {stats.map((item, index) => (
              <motion.div key={item.label} whileHover={{ y: -4 }} className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-glow backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-800 dark:text-emerald-300">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="relative z-10 flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-xl rounded-[32px] border border-white/50 bg-white/70 p-8 shadow-glow backdrop-blur-2xl dark:border-slate-700/60 dark:bg-slate-950/75">
            <div className="absolute -left-8 top-8 hidden h-20 w-20 rounded-full bg-emerald-200/40 blur-3xl lg:block" />
            <div className="absolute -right-10 bottom-12 h-28 w-28 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-emerald-100/80 bg-emerald-50/70 p-10 shadow-inner dark:border-emerald-700/40 dark:bg-slate-900/80">
              <div className="flex items-center justify-between rounded-3xl bg-emerald-900/95 p-4 text-white shadow-lg">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em]">SDIT Cahaya Ilmu</p>
                  <p className="mt-2 text-lg font-semibold">Generasi Qurani dan Cerdas</p>
                </div>
                <div className="rounded-3xl bg-white/15 p-3">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-white to-emerald-100/80 p-6 text-slate-900 shadow-soft dark:from-slate-800 dark:to-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Ilustrasi anak muslim belajar di lingkungan premium dengan sentuhan islami modern.</p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl bg-white/90 p-5 shadow-sm dark:bg-slate-950/80">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Kurikulum Islam Terpadu</p>
                    <p className="mt-3 text-xl font-semibold">Tahfidz, BTQ & Karakter</p>
                  </div>
                  <div className="rounded-3xl bg-white/90 p-5 shadow-sm dark:bg-slate-950/80">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Lingkungan Aman dan Nyaman</p>
                    <p className="mt-3 text-xl font-semibold">Ramah Anak & Berteknologi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent dark:from-slate-950/90" />
    </section>
  );
}
