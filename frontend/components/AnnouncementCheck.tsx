'use client';

import { useState } from 'react';
import axios from 'axios';

export function AnnouncementCheck() {
  const [registrationNo, setRegistrationNo] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleCheck = async () => {
    setResult(null);
    try {
      const response = await axios.get('/api/registrations/check', {
        baseURL: 'http://localhost:5000',
        params: { registrationNo, birthDate }
      });
      setStatus(response.data.status);
      setResult(`Selamat! Status: ${response.data.status}`);
    } catch (error) {
      setResult('Nomor pendaftaran atau tanggal lahir tidak ditemukan.');
      setStatus(null);
    }
  };

  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-white/80 bg-glass p-8 shadow-glow dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Pengumuman PPDB</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Cek hasil seleksi dengan nomor pendaftaran</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Nomor Pendaftaran</span>
            <input value={registrationNo} onChange={(e) => setRegistrationNo(e.target.value)} placeholder="PPDB-123456-789" className="mt-2 w-full px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-slate-900 dark:text-slate-100" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Tanggal Lahir</span>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-2 w-full px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-slate-900 dark:text-slate-100" />
          </label>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button onClick={handleCheck} className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 hover:bg-emerald-800">
            Cek Kelulusan
          </button>
          {status && <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">{status}</span>}
        </div>

        {result && (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white/90 p-5 text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900/85 dark:text-slate-100">
            {result}
          </div>
        )}
      </div>
    </section>
  );
}
