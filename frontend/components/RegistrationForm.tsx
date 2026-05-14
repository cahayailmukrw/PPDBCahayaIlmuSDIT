'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import axios from 'axios';

const steps = ['Data Siswa', 'Data Orang Tua', 'Dokumen & Review'];

const initialData = {
  fullName: '',
  nik: '',
  nisn: '',
  birthPlace: '',
  birthDate: '',
  gender: '',
  religion: '',
  address: '',
  originSchool: '',
  siblingOrder: '',
  siblingCount: '',
  fatherName: '',
  motherName: '',
  fatherJob: '',
  motherJob: '',
  income: '',
  phone: '',
  email: '',
  parentAddress: '',
  programChoice: 'REGULER',
  documents: [] as Array<{ fileName: string; filePath: string; fileType: string }>,
  agree: false
};

export function RegistrationForm() {
  const [form, setForm] = useState(initialData);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [registrationNo, setRegistrationNo] = useState<string | null>(null);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFile = (file: File, field: string) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setForm((prev) => ({
          ...prev,
          documents: [...prev.documents, { fileName: file.name, filePath: String(reader.result), fileType: file.type }]
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!form.agree) {
      setMessage('Mohon setuju dengan syarat pendaftaran.');
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.post('/api/registrations', form, { baseURL: 'http://localhost:5000' });
      setRegistrationNo(response.data.registrationNo);
      setMessage('Pendaftaran berhasil. Simpan nomor pendaftaran Anda.');
    } catch (error) {
      setMessage('Gagal mengirim pendaftaran. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Form Pendaftaran Online</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Isi formulir PPDB dengan langkah mudah dan aman</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Gunakan form ini untuk memulai proses pendaftaran calon siswa baru.</p>
        </div>

        <div className="rounded-[32px] border border-white/80 bg-glass p-8 shadow-glow dark:border-slate-800/80 dark:bg-slate-950/80">
          <div className="mb-8 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-2 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-gold" style={{ width: `${progress}%` }} />
          </div>
          <div className="mb-8 flex flex-wrap gap-3">
            {steps.map((label, index) => (
              <button key={label} type="button" className={`rounded-full px-4 py-2 text-sm font-medium transition ${index === step ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}
                onClick={() => setStep(index)}>
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="student" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { label: 'Nama Lengkap', name: 'fullName', type: 'text' },
                    { label: 'NIK', name: 'nik', type: 'text' },
                    { label: 'NISN', name: 'nisn', type: 'text' },
                    { label: 'Tempat Lahir', name: 'birthPlace', type: 'text' },
                    { label: 'Tanggal Lahir', name: 'birthDate', type: 'date' },
                    { label: 'Jenis Kelamin', name: 'gender', type: 'select', options: ['Laki-laki', 'Perempuan'] },
                    { label: 'Agama', name: 'religion', type: 'text' },
                    { label: 'Alamat Lengkap', name: 'address', type: 'text' },
                    { label: 'Asal Sekolah', name: 'originSchool', type: 'text' },
                    { label: 'Anak ke', name: 'siblingOrder', type: 'number' },
                    { label: 'Jumlah Saudara', name: 'siblingCount', type: 'number' }
                  ].map((field) => (
                    <label key={field.name} className="block">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{field.label}</span>
                      {field.type === 'select' ? (
                        <select value={form[field.name as keyof typeof form] as string} onChange={(e) => handleChange(field.name, e.target.value)} className="mt-2 w-full px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-slate-900 dark:text-slate-100">
                          <option value="">Pilih</option>
                          {field.options?.map((option) => (<option key={option} value={option}>{option}</option>))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={form[field.name as keyof typeof form] as string}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          className="mt-2 w-full px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-slate-900 dark:text-slate-100"
                        />
                      )}
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="parent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { label: 'Nama Ayah', name: 'fatherName' },
                    { label: 'Nama Ibu', name: 'motherName' },
                    { label: 'Pekerjaan Ayah', name: 'fatherJob' },
                    { label: 'Pekerjaan Ibu', name: 'motherJob' },
                    { label: 'Penghasilan', name: 'income' },
                    { label: 'Nomor WhatsApp', name: 'phone' },
                    { label: 'Email', name: 'email' },
                    { label: 'Alamat Orang Tua', name: 'parentAddress' }
                  ].map((field) => (
                    <label key={field.name} className="block">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{field.label}</span>
                      <input
                        type="text"
                        value={form[field.name as keyof typeof form] as string}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="mt-2 w-full px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </label>
                  ))}
                  <label className="block md:col-span-2">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Pilihan Program</span>
                    <select value={form.programChoice} onChange={(e) => handleChange('programChoice', e.target.value)} className="mt-2 w-full px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-slate-900 dark:text-slate-100">
                      <option value="REGULER">Reguler</option>
                      <option value="TAHFIDZ">Tahfidz</option>
                    </select>
                  </label>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="docs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="grid gap-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    {['Akta', 'KK', 'Pas Foto'].map((label) => (
                      <label key={label} className="block rounded-3xl border border-slate-200 bg-white/90 p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                        <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">Unggah {label}</span>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file, label); }}
                          className="mt-4 w-full cursor-pointer text-sm text-slate-700 dark:text-slate-300"
                        />
                      </label>
                    ))}
                  </div>
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-6 text-slate-900 dark:border-emerald-500/40 dark:bg-slate-900/80 dark:text-slate-100">
                    <p className="font-semibold">Preview Dokumen Terunggah</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {form.documents.length ? form.documents.map((doc) => <li key={doc.fileName}>{doc.fileName}</li>) : <li>Belum ada dokumen terunggah.</li>}
                    </ul>
                  </div>
                  <label className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                    <input type="checkbox" checked={form.agree} onChange={(e) => handleChange('agree', e.target.checked)} className="mt-1 h-5 w-5 rounded border-slate-300 text-emerald-600" />
                    <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">Saya menyetujui syarat pendaftaran PPDB dan data yang saya isi adalah benar.</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-300">
              {message ?? 'Lengkapi setiap langkah dan unggah dokumen untuk melanjutkan proses PPDB.'}
            </div>
            <div className="flex flex-wrap gap-3">
              {step > 0 && (
                <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200">
                  Kembali
                </button>
              )}
              {step < steps.length - 1 ? (
                <button type="button" onClick={() => setStep(step + 1)} className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 hover:bg-emerald-800">
                  Lanjutkan
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={loading} className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-300/30 hover:bg-[#c79b49] disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
                </button>
              )}
            </div>
          </div>

          {registrationNo && (
            <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50/80 p-6 text-slate-900 shadow-sm dark:border-emerald-500/40 dark:bg-slate-900/80 dark:text-slate-100">
              <p className="font-semibold">Nomor Pendaftaran Anda</p>
              <p className="mt-3 text-xl font-semibold">{registrationNo}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Simpan nomor ini untuk cek pengumuman dan daftar ulang.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
