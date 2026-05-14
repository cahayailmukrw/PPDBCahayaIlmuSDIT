'use client';

import { motion } from 'framer-motion';
import { BookOpen, HeartHandshake, Leaf, Sparkles, Globe2, Monitor, Users, ShieldCheck, Lightbulb, Activity } from 'lucide-react';

const programs = [
  { title: 'Tahfidz Qur’an', description: 'Program hafalan Al-Qur’an terstruktur.', icon: BookOpen },
  { title: 'BTQ', description: 'Baca, tulis, dan qiraah bersama.', icon: Sparkles },
  { title: 'Kaligrafi', description: 'Seni tulisan Islami yang indah.', icon: HeartHandshake },
  { title: 'Hadrah', description: 'Kegiatan musik dan doa kolektif.', icon: Activity },
  { title: 'Science Day', description: 'Eksperimen sains kreatif.', icon: Lightbulb },
  { title: 'Market Day', description: 'Pembelajaran ekonomi praktis.', icon: Globe2 },
  { title: 'Karakter Islami', description: 'Adab, akhlak, dan etika bermasyarakat.', icon: ShieldCheck },
  { title: 'Smart Classroom', description: 'Teknologi kelas modern.', icon: Monitor },
  { title: 'Parenting Program', description: 'Kolaborasi sekolah dengan orang tua.', icon: Users },
  { title: 'Konseling Anak', description: 'Pendampingan psikologis dan prestasi.', icon: Leaf }
];

export function ProgramSection() {
  return (
    <section id="program" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Program Unggulan</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Program Islami dan Edukatif yang Membangun Potensi Anak</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 220 }} className="rounded-[32px] border border-white/70 bg-glass p-8 shadow-glow backdrop-blur-xl dark:border-slate-800/70">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-700 text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
