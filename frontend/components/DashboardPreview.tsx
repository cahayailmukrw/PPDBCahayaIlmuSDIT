'use client';

import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, ListChecks, Search, ShieldCheck, Sparkles } from 'lucide-react';

export function DashboardPreview() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Dashboard Admin</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Panel Admin Premium untuk Kelola PPDB</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Monitoring pendaftar, verifikasi, notifikasi, dan pelaporan dalam satu tampilan modern.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.7fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[32px] border border-white/70 bg-glass p-8 shadow-glow dark:border-slate-800/80 dark:bg-slate-950/80">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-emerald-700">Statistik Pendaftar</p>
                <h3 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">425 Total Input</h3>
              </div>
              <BarChart3 className="h-10 w-10 text-emerald-700" />
            </div>
            <div className="grid gap-4">
              {[
                { label: 'Menunggu Verifikasi', value: '28', icon: ListChecks },
                { label: 'Terverifikasi', value: '45', icon: CheckCircle2 },
                { label: 'Program Tahfidz', value: '17', icon: Sparkles },
                { label: 'Pencarian Data', value: 'Cepat', icon: Search }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/85">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-700 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} className="rounded-[32px] border border-white/70 bg-glass p-8 shadow-glow dark:border-slate-800/80 dark:bg-slate-950/80">
            <p className="text-sm uppercase tracking-[0.22em] text-emerald-700">Panel Verifikasi</p>
            <div className="mt-6 space-y-4">
              {['Menyetujui berkas dengan cepat', 'Filter status pendaftar', 'Download hasil Excel & PDF', 'Notifikasi WhatsApp & email'].map((item) => (
                <div key={item} className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white/90 p-5 dark:border-slate-700 dark:bg-slate-900/85">
                  <ShieldCheck className="mt-1 h-5 w-5 text-emerald-700" />
                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
