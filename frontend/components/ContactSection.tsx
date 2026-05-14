'use client';

import { useState } from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Mail, MessageCircle, Phone, Send } from 'lucide-react';

export function ContactSection() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_0.8fr] lg:items-start">
          <div className="rounded-[32px] border border-white/80 bg-glass p-10 shadow-glow dark:border-slate-800/80 dark:bg-slate-950/80">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Kontak</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Hubungi tim PPDB SDIT Cahaya Ilmu</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">Kami siap membantu orang tua dan calon siswa dengan informasi lengkap dan layanan pendaftaran.</p>

            <div className="mt-10 space-y-6 text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-3 rounded-3xl bg-white/90 p-5 shadow-sm dark:bg-slate-900/80">
                <MapPin className="h-5 w-5 text-emerald-700" />
                <span>Jalan Dusun Krajan, Desa Cibalongsari, Klari, Karawang, Jawa Barat</span>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-white/90 p-5 shadow-sm dark:bg-slate-900/80">
                <Phone className="h-5 w-5 text-emerald-700" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-white/90 p-5 shadow-sm dark:bg-slate-900/80">
                <Mail className="h-5 w-5 text-emerald-700" />
                <span>info@sditcahayailmu.sch.id</span>
              </div>
              <div className="rounded-3xl bg-emerald-50/90 p-5 dark:bg-slate-900/80">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Jam Operasional</p>
                <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">Senin - Jumat, 08.00 - 16.00 WIB</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3 text-slate-700 dark:text-slate-300">
              <a href="#" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold transition hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900/90">
                <Facebook className="h-4 w-4 text-emerald-700" /> Facebook
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold transition hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900/90">
                <Instagram className="h-4 w-4 text-emerald-700" /> Instagram
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold transition hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900/90">
                <Linkedin className="h-4 w-4 text-emerald-700" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/80 bg-glass p-10 shadow-glow dark:border-slate-800/80 dark:bg-slate-950/80">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Form Kontak</p>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">Tinggalkan pesan, kami akan segera merespons.</h3>

            <form className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Nama Lengkap</span>
                <input type="text" placeholder="Contoh: Ahmad Yusuf" className="mt-2 w-full px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-slate-900 dark:text-slate-100" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Email</span>
                <input type="email" placeholder="email@domain.com" className="mt-2 w-full px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-slate-900 dark:text-slate-100" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Pesan</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="mt-2 w-full px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-slate-900 dark:text-slate-100" />
              </label>
              <button type="button" onClick={() => setSubmitted(true)} className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 hover:bg-emerald-800">
                <Send className="h-4 w-4" /> Kirim Pesan
              </button>
              {submitted && <p className="text-sm text-emerald-700">Terima kasih! Pesan Anda telah kami terima.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
