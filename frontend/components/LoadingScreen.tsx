'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-white">
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 shadow-xl shadow-emerald-500/40">
              <div className="h-12 w-12 animate-pulse rounded-full bg-white/90" />
            </div>
            <div>
              <p className="text-2xl font-semibold">SDIT Cahaya Ilmu</p>
              <p className="text-sm text-slate-200">Mempersiapkan generasi Qurani, cerdas, dan berkarakter.</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
