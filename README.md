# PPDB Cahaya Ilmu SDIT

Proyek ini adalah website PPDB modern untuk SDIT Cahaya Ilmu, termasuk frontend Next.js App Router dan backend Express dengan Prisma.

## Struktur Proyek

- `frontend/` - Next.js, Tailwind CSS, Framer Motion, PWA
- `backend/` - Express API, Prisma ORM, JWT authentication

## Installasi

1. Jalankan `npm install` di root untuk menginstal dependensi workspace.
2. Atau jalankan masing-masing:
   - `cd frontend && npm install`
   - `cd backend && npm install`

## Menjalankan development

- Frontend: `cd frontend && npm run dev`
- Backend: `cd backend && npm run dev`
- Jalankan kedua server secara bersamaan dengan `npm run dev` dari root jika sudah menginstal dependensi root.

## Konfigurasi Backend

Salin `backend/.env.example` menjadi `backend/.env` dan sesuaikan koneksi PostgreSQL.

## Fitur utama

- Landing page premium dengan hero, program, fasilitas, dan alur PPDB
- Form pendaftaran multi-step dengan preview dokumen
- Dashboard admin preview dan API pendaftaran
- Halaman cek pengumuman kelulusan
- Kontak, dark mode, animasi, dan desain responsif
