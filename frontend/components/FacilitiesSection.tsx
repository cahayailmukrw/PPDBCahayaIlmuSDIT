'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

const facilities = [
  { title: 'Ruang Kelas Modern', caption: 'Kelas nyaman dan cerdas dengan teknologi interaktif.', image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Musholla', caption: 'Tempat ibadah yang teduh dan khusyuk.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Laboratorium Komputer', caption: 'Pembelajaran digital dengan lingkungan modern.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Perpustakaan', caption: 'Sumber bacaan Islami dan akademik.', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Lapangan Olahraga', caption: 'Aktivitas sehat untuk anak-anak.', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Area Bermain', caption: 'Ramah anak untuk eksplorasi dan kreativitas.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Sanitasi Bersih', caption: 'Kebersihan dan kesehatan siswa prioritas.', image: 'https://images.unsplash.com/photo-1580987071250-8c093aa88c2f?auto=format&fit=crop&w=1000&q=80' },
  { title: 'CCTV Keamanan', caption: 'Pengawasan ketat untuk lingkungan positif.', image: 'https://images.unsplash.com/photo-1549921296-3aaade8d08d3?auto=format&fit=crop&w=1000&q=80' }
];

export function FacilitiesSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="facilities" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Fasilitas Sekolah</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Galeri Fasilitas Modern dengan Sentuhan Islami</h2>
        </div>
        <div className="masonry-grid gap-6 sm:masonry-cols-2 xl:masonry-cols-3">
          {facilities.map((item, index) => (
            <motion.button
              key={item.title}
              onClick={() => setActive(index)}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-glass p-0 text-left shadow-glow transition dark:border-slate-800/70"
            >
              <div className="relative h-80 overflow-hidden bg-slate-200">
                <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-3xl bg-white/90 p-5 shadow-lg dark:bg-slate-900/85">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-emerald-700">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{item.caption}</p>
                    </div>
                    <ZoomIn className="h-6 w-6 text-emerald-700" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {active !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6">
              <div className="relative w-full max-w-4xl overflow-hidden rounded-[36px] border border-white/20 bg-slate-950 shadow-2xl">
                <button onClick={() => setActive(null)} className="absolute right-4 top-4 rounded-full border border-white/20 bg-slate-900/70 px-4 py-2 text-sm text-white">Tutup</button>
                <img src={facilities[active].image} alt={facilities[active].title} className="h-[420px] w-full object-cover" />
                <div className="p-8 bg-slate-950 text-white">
                  <h3 className="text-3xl font-semibold">{facilities[active].title}</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-300">{facilities[active].caption}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
