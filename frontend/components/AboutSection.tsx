'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Globe2, HeartHandshake } from 'lucide-react';

const values = [
  { title: 'Islamic Character', description: 'Menanamkan nilai Qur’an dan Sunnah dalam kehidupan sehari-hari.', icon: ShieldCheck },
  { title: 'Academic Excellence', description: 'Pembelajaran berkualitas untuk kompetensi abad 21.', icon: Globe2 },
  { title: 'Tahfidz Program', description: 'Program hafalan Al-Qur’an terstruktur hingga 5 juz.', icon: Sparkles },
  { title: 'Technology Based Learning', description: 'Ruang kelas modern dengan pembelajaran digital.', icon: HeartHandshake }
];

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="rounded-[32px] bg-glass p-8 shadow-glow backdrop-blur-xl border border-white/70 dark:border-slate-700/70">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">Tentang Sekolah</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Menjalin kecerdasan, karakter, dan spiritual muslim dalam suasana premium.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              SDIT Cahaya Ilmu hadir dengan pendidikan dasar Islam terpadu, lingkungan belajar aman, fasilitas modern, dan dukungan karakter Islami untuk anak-anak berprestasi.
            </p>
            <div className="mt-10 space-y-3 rounded-3xl bg-emerald-50/80 p-6 text-slate-800 shadow-sm dark:bg-slate-900/80 dark:text-slate-100">
              <p className="font-semibold">Visi</p>
              <p>“Mewujudkan generasi Islam yang berkarakter, berakhlak mulia, cerdas, mandiri, dan berwawasan global berbasis nilai-nilai Al-Qur’an dan Sunnah.”</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid gap-6">
            <div className="rounded-[32px] overflow-hidden border border-white/60 bg-white/80 p-1 shadow-glow backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/80">
              <div className="grid gap-6 bg-slate-950 p-8 text-white md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Status</p>
                  <p className="mt-3 text-xl font-semibold">Sekolah Swasta</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Naungan</p>
                  <p className="mt-3 text-xl font-semibold">Yayasan Cahaya Abah Ambu</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} whileHover={{ y: -6 }} className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm transition hover:border-emerald-200 dark:border-slate-800 dark:bg-slate-900/85">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-700 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
