const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ExcelJS = require('exceljs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images and PDF files are allowed'));
  }
});

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initializeDatabase() {
  try {
    // Students table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        registration_number TEXT UNIQUE,
        full_name TEXT NOT NULL,
        gender TEXT NOT NULL,
        birth_place TEXT NOT NULL,
        birth_date TEXT NOT NULL,
        address TEXT NOT NULL,
        previous_school TEXT,
        father_name TEXT NOT NULL,
        mother_name TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        kk_file TEXT,
        birth_certificate_file TEXT,
        photo_file TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Admin table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create default admin if not exists
    const defaultPassword = bcrypt.hashSync('camucaang', 10);
    await pool.query(
      `INSERT INTO admins (username, password) 
       SELECT $1, $2 
       WHERE NOT EXISTS (SELECT 1 FROM admins WHERE username = $1)`,
      ['cahayailmukrw', defaultPassword]
    );

    // PPDB settings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ppdb_settings (
        id SERIAL PRIMARY KEY,
        academic_year TEXT NOT NULL,
        quota INTEGER NOT NULL,
        registration_start TEXT NOT NULL,
        registration_end TEXT NOT NULL,
        requirements TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default PPDB settings
    await pool.query(
      `INSERT INTO ppdb_settings (academic_year, quota, registration_start, registration_end, requirements)
       SELECT $1, $2, $3, $4, $5
       WHERE NOT EXISTS (SELECT 1 FROM ppdb_settings)`,
      ['2026/2027', 100, '2026-01-01', '2026-06-30', 'Kartu Keluarga, Akta Lahir, Pas Foto 3x4']
    );
  } catch (err) {
    throw err;
  }
}

// Generate registration number
function generateRegistrationNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `PPDB${year}${random}`;
}

// API Routes

// Get PPDB info
app.get('/api/ppdb-info', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ppdb_settings ORDER BY id DESC LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register student
app.post('/api/register', upload.fields([
  { name: 'kk', maxCount: 1 },
  { name: 'birthCertificate', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), async (req, res) => {
  const {
    fullName,
    gender,
    birthPlace,
    birthDate,
    address,
    previousSchool,
    fatherName,
    motherName,
    whatsapp
  } = req.body;

  const kkFile = req.files['kk'] ? req.files['kk'][0].filename : null;
  const birthCertificateFile = req.files['birthCertificate'] ? req.files['birthCertificate'][0].filename : null;
  const photoFile = req.files['photo'] ? req.files['photo'][0].filename : null;

  const registrationNumber = generateRegistrationNumber();

  try {
    await pool.query(
      `INSERT INTO students 
        (registration_number, full_name, gender, birth_place, birth_date, address, 
         previous_school, father_name, mother_name, whatsapp, kk_file, 
         birth_certificate_file, photo_file)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [registrationNumber, fullName, gender, birthPlace, birthDate, address,
        previousSchool, fatherName, motherName, whatsapp, kkFile,
        birthCertificateFile, photoFile]
    );
    res.json({ 
      success: true, 
      registrationNumber,
      message: 'Pendaftaran berhasil' 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check announcement
app.get('/api/announcement/:registrationNumber', async (req, res) => {
  const { registrationNumber } = req.params;
  
  try {
    const result = await pool.query('SELECT * FROM students WHERE registration_number = $1', [registrationNumber]);
    if (result.rows.length === 0) {
      res.json({ found: false, message: 'Nomor pendaftaran tidak ditemukan' });
    } else {
      res.json({
        found: true,
        fullName: result.rows[0].full_name,
        status: result.rows[0].status
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Username tidak ditemukan' });
    } else {
      const admin = result.rows[0];
      const isValid = bcrypt.compareSync(password, admin.password);
      if (isValid) {
        const token = jwt.sign({ id: admin.id }, 'secret-key', { expiresIn: '24h' });
        res.json({ success: true, token });
      } else {
        res.status(401).json({ error: 'Password salah' });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all students (admin)
app.get('/api/admin/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student status (admin)
app.put('/api/admin/students/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    await pool.query('UPDATE students SET status = $1 WHERE id = $2', [status, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get statistics (admin)
app.get('/api/admin/stats', async (req, res) => {
  try {
    const result = await pool.query('SELECT status, COUNT(*) as count FROM students GROUP BY status');
    const stats = {};
    result.rows.forEach(row => {
      stats[row.status] = row.count;
    });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export to Excel (admin)
app.get('/api/admin/export', async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data Pendaftar');

    worksheet.columns = [
      { header: 'No Pendaftaran', key: 'registration_number', width: 20 },
      { header: 'Nama Lengkap', key: 'full_name', width: 30 },
      { header: 'Jenis Kelamin', key: 'gender', width: 15 },
      { header: 'Tempat Lahir', key: 'birth_place', width: 20 },
      { header: 'Tanggal Lahir', key: 'birth_date', width: 15 },
      { header: 'Alamat', key: 'address', width: 40 },
      { header: 'Asal Sekolah', key: 'previous_school', width: 25 },
      { header: 'Nama Ayah', key: 'father_name', width: 25 },
      { header: 'Nama Ibu', key: 'mother_name', width: 25 },
      { header: 'WhatsApp', key: 'whatsapp', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Tanggal Daftar', key: 'created_at', width: 20 }
    ];

    const result = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
    worksheet.addRows(result.rows);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=data-pendaftar.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update PPDB settings (admin)
app.put('/api/admin/ppdb-settings', async (req, res) => {
  const { academicYear, quota, registrationStart, registrationEnd, requirements } = req.body;

  try {
    await pool.query(
      `UPDATE ppdb_settings SET 
        academic_year = $1, quota = $2, registration_start = $3, 
        registration_end = $4, requirements = $5 
        WHERE id = (SELECT id FROM ppdb_settings ORDER BY id DESC LIMIT 1)`,
      [academicYear, quota, registrationStart, registrationEnd, requirements]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Initialize database and export for Vercel
initializeDatabase().then(() => {
  console.log('Database initialized successfully');
}).catch(err => {
  console.error('Database initialization error:', err);
});

// Export for Vercel
module.exports = app;
