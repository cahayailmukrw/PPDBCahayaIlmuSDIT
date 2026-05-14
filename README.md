# PPDB SDIT Cahaya Ilmu

Website Penerimaan Peserta Didik Baru (PPDB) sederhana, cepat, ringan, dan mobile-friendly untuk SDIT Cahaya Ilmu.

## Fitur

- **Pendaftaran Online**: Formulir pendaftaran dengan upload dokumen
- **Informasi PPDB**: Jadwal, kuota, dan syarat pendaftaran
- **Cek Pengumuman**: Cek hasil seleksi berdasarkan nomor pendaftaran
- **Admin Panel**: Dashboard untuk mengelola data pendaftar
- **Export Excel**: Export data pendaftar ke format Excel
- **Dark Mode**: Mode gelap untuk kenyamanan mata
- **Responsive Design**: Tampilan optimal di semua perangkat

## Teknologi

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- SQLite (Database)

## Struktur Folder

```
PPDBCahayaIlmuSDIT/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── admin.html
│   ├── style.css
│   ├── script.js
│   └── admin.js
├── uploads/
├── database/
└── public/
```

## Instalasi

### Prasyarat
- Node.js (v14 atau lebih tinggi)
- npm atau yarn

### Langkah-langkah

1. Clone atau download repository ini

2. Masuk ke folder backend:
```bash
cd backend
```

3. Install dependencies:
```bash
npm install
```

4. Jalankan server:
```bash
npm start
```

5. Buka browser dan akses:
   - Website utama: http://localhost:3000
   - Admin panel: http://localhost:3000/admin.html

## Konfigurasi Admin

### Login Default
- **Username**: cahayailmukrw
- **Password**: camucaang

⚠️ **Penting**: Segera ganti password default setelah login pertama untuk keamanan.

### Fitur Admin
- Melihat statistik pendaftar
- Mengelola status pendaftar (Lulus/Cadangan/Tolak)
- Export data ke Excel
- Mengatur informasi PPDB (tahun ajaran, kuota, jadwal, syarat)

## Penggunaan Website

### Untuk Orang Tua Murid

1. **Informasi PPDB**: Lihat jadwal, kuota, dan syarat pendaftaran di menu PPDB
2. **Pendaftaran**: Isi formulir pendaftaran dan upload dokumen yang diperlukan
3. **Simpan Nomor Pendaftaran**: Catat nomor pendaftaran yang diberikan setelah submit
4. **Cek Pengumuman**: Gunakan nomor pendaftaran untuk mengecek hasil seleksi

### Untuk Admin Sekolah

1. **Login**: Masuk ke admin panel dengan username dan password
2. **Dashboard**: Lihat statistik pendaftar
3. **Kelola Data**: Ubah status pendaftar (Lulus/Cadangan/Tolak)
4. **Export**: Download data pendaftar dalam format Excel
5. **Pengaturan**: Update informasi PPDB sesuai kebutuhan

## Warna Tema

Website menggunakan warna islami:
- **Hijau Utama**: #2E7D32
- **Hijau Terang**: #4CAF50
- **Putih**: #FFFFFF
- **Biru Muda**: #E3F2FD
- **Abu Soft**: #F5F5F5

## Program Unggulan

- Tahfidz Qur'an
- BTQ (Baca Tulis Al-Qur'an)
- Sholat Berjamaah
- Science Day
- Market Day
- Karakter Islami
- Teknologi Dasar

## Informasi Sekolah

**Nama**: SDIT Cahaya Ilmu  
**Alamat**: Jalan Dusun Krajan, Desa Cibalongsari, Kecamatan Klari, Kabupaten Karawang, Jawa Barat  
**Status**: Sekolah Swasta  
**Naungan**: Yayasan Cahaya Abah Ambu

## Deployment

### Render (Recommended - Gratis dengan Spin-down)
1. Push kode ke GitHub
2. Buka https://render.com
3. Login dengan GitHub
4. Klik "New +" → "Web Service"
5. Connect repository: cahayailmukrw/PPDBCahayaIlmuSDIT
6. Konfigurasi:
   - **Name**: ppdb-cahaya-ilmu
   - **Environment**: Node
   - **Build Command**: cd backend && npm install
   - **Start Command**: cd backend && npm start
   - **Root Directory**: (kosongkan / root)
7. Klik "Deploy Web Service"
8. Tunggu deployment selesai (±2-3 menit)
9. Website akan live di URL: https://ppdb-cahaya-ilmu.onrender.com

**Catatan Render:**
- Gratis dengan spin-down setelah 15 menit tidak aktif
- Cold start ±30 detik saat pertama kali diakses
- Cocok untuk project dengan traffic rendah
- SQLite akan tersimpan di Render filesystem

### Railway (Alternatif)
1. Push kode ke GitHub
2. Buka https://railway.app
3. Login dengan GitHub
4. Klik "New Project" → "Deploy from GitHub repo"
5. Pilih repository
6. Deploy (otomatis terdeteksi)

### VPS (Untuk Production Stabil)
1. Setup VPS (DigitalOcean, Linode, dll)
2. Install Node.js dan PM2
3. Clone repository
4. Install dependencies: cd backend && npm install
5. Jalankan dengan PM2: pm2 start backend/server.js --name ppdb
6. Setup Nginx reverse proxy (opsional)

## Keamanan

- Password admin di-hash menggunakan bcrypt
- Validasi input pada form
- Batasan ukuran file upload (max 5MB)
- Tipe file yang diizinkan: JPG, PNG, PDF

## Optimasi

- Website dirancang ringan untuk loading cepat
- Tidak menggunakan library berat
- CSS dan JavaScript minimalis
- Cocok untuk hosting murah dan HP low-end

## Troubleshooting

### Port sudah digunakan
Jika port 3000 sudah digunakan, ubah di `server.js`:
```javascript
const PORT = process.env.PORT || 3001; // atau port lain
```

### Database error
Pastikan folder `database` ada dan memiliki permission write.

### Upload gagal
Pastikan folder `uploads` ada dan memiliki permission write.

## Support

Untuk bantuan atau pertanyaan, hubungi:
- WhatsApp: +62 812-3456-7890
- Email: info@sditcahayailmu.sch.id

## License

© 2026 SDIT Cahaya Ilmu. All rights reserved.
