'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Upload, CheckCircle2, FileText, CalendarDays, Repeat } from 'lucide-react';

const steps = [
  { title: 'Registrasi Online', description: 'Isi formulir lengkap dan unggah dokumen.', icon: ClipboardList },
  { title: 'Upload Berkas', description: 'Akta, KK, dan pas foto dijadikan satu paket digital.', icon: Upload },
  { title: 'Verifikasi Admin', description: 'Tim panitia memeriksa kelengkapan dokumen.', icon: CheckCircle2 },
  { title: 'Tes / Observasi', description: 'Observasi pembelajaran dan kesiapan anak.', icon: FileText },
  { title: 'Pengumuman', description: 'Hasil seleksi diumumkan dengan transparan.', icon: CalendarDays },
  { title: 'Daftar Ulang', description: 'Konfirmasi kursi dan siapkan administrasi akhir.', icon: Repeat }
];

export function PPDBTimeline() {
  return (
    <section id="timeline" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Alur PPDB</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Proses Pendaftaran yang Mudah, Jelas, dan Profesional</h2>
        </div>
        <div className="relative mx-auto grid max-w-5xl gap-8 border-l border-emerald-200 pl-8 dark:border-emerald-500/50 lg:pl-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} className="relative pl-8">
                <span className="absolute -left-4 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-glow dark:border-slate-800/70 dark:bg-slate-950/85">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{`Langkah ${index + 1}`}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
