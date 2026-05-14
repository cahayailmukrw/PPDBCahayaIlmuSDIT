const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ExcelJS = require('exceljs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../frontend')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Ensure database directory exists
const dbDir = path.join(__dirname, '../database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
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
const dbPath = path.join(__dirname, '../database/ppdb.db');
let db;

async function startServer() {
  try {
    db = new sqlite3.Database(dbPath);
    console.log('Connected to SQLite database');
    await initializeDatabase();
    console.log('Database initialized successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Students table
      db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) reject(err);
      });

      // Admin table
      db.run(`CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) reject(err);
      });

      // Create default admin if not exists
      const defaultPassword = bcrypt.hashSync('camucaang', 10);
      db.run(`INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)`,
        ['cahayailmukrw', defaultPassword], (err) => {
          if (err) reject(err);
        });

      // PPDB settings table
      db.run(`CREATE TABLE IF NOT EXISTS ppdb_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        academic_year TEXT NOT NULL,
        quota INTEGER NOT NULL,
        registration_start TEXT NOT NULL,
        registration_end TEXT NOT NULL,
        requirements TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) reject(err);
      });

      // Insert default PPDB settings
      db.run(`INSERT OR IGNORE INTO ppdb_settings (academic_year, quota, registration_start, registration_end, requirements) 
        VALUES (?, ?, ?, ?, ?)`,
        ['2026/2027', 100, '2026-01-01', '2026-06-30', 'Kartu Keluarga, Akta Lahir, Pas Foto 3x4'], (err) => {
          if (err) reject(err);
          else resolve();
        });
    });
  });
}

// Generate registration number
function generateRegistrationNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `PPDB${year}${random}`;
}

// API Routes

// Get PPDB info
app.get('/api/ppdb-info', (req, res) => {
  db.get('SELECT * FROM ppdb_settings ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row || {});
    }
  });
});

// Register student
app.post('/api/register', upload.fields([
  { name: 'kk', maxCount: 1 },
  { name: 'birthCertificate', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), (req, res) => {
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

  const sql = `INSERT INTO students 
    (registration_number, full_name, gender, birth_place, birth_date, address, 
     previous_school, father_name, mother_name, whatsapp, kk_file, 
     birth_certificate_file, photo_file)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [
    registrationNumber, fullName, gender, birthPlace, birthDate, address,
    previousSchool, fatherName, motherName, whatsapp, kkFile,
    birthCertificateFile, photoFile
  ], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({
        success: true,
        registrationNumber,
        message: 'Pendaftaran berhasil'
      });
    }
  });
});

// Check announcement
app.get('/api/announcement/:registrationNumber', (req, res) => {
  const { registrationNumber } = req.params;

  db.get('SELECT * FROM students WHERE registration_number = ?', [registrationNumber], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.json({ found: false, message: 'Nomor pendaftaran tidak ditemukan' });
    } else {
      res.json({
        found: true,
        fullName: row.full_name,
        status: row.status
      });
    }
  });
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM admins WHERE username = ?', [username], (err, admin) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!admin) {
      res.status(401).json({ error: 'Username tidak ditemukan' });
    } else {
      const isValid = bcrypt.compareSync(password, admin.password);
      if (isValid) {
        const token = jwt.sign({ id: admin.id }, 'secret-key', { expiresIn: '24h' });
        res.json({ success: true, token });
      } else {
        res.status(401).json({ error: 'Password salah' });
      }
    }
  });
});

// Get all students (admin)
app.get('/api/admin/students', (req, res) => {
  const sql = `SELECT * FROM students ORDER BY created_at DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Update student status (admin)
app.put('/api/admin/students/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  db.run('UPDATE students SET status = ? WHERE id = ?', [status, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Get statistics (admin)
app.get('/api/admin/stats', (req, res) => {
  db.all('SELECT status, COUNT(*) as count FROM students GROUP BY status', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const stats = {};
      rows.forEach(row => {
        stats[row.status] = row.count;
      });
      res.json(stats);
    }
  });
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

    db.all('SELECT * FROM students ORDER BY created_at DESC', [], async (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        worksheet.addRows(rows);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=data-pendaftar.xlsx');

        await workbook.xlsx.write(res);
        res.end();
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update PPDB settings (admin)
app.put('/api/admin/ppdb-settings', (req, res) => {
  const { academicYear, quota, registrationStart, registrationEnd, requirements } = req.body;

  const sql = `UPDATE ppdb_settings SET 
    academic_year = ?, quota = ?, registration_start = ?, 
    registration_end = ?, requirements = ? 
    WHERE id = (SELECT id FROM ppdb_settings ORDER BY id DESC LIMIT 1)`;

  db.run(sql, [academicYear, quota, registrationStart, registrationEnd, requirements], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
startServer();
