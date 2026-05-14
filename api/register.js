const pool = require('./db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for memory storage (Vercel serverless)
const storage = multer.memoryStorage();
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

function generateRegistrationNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `PPDB${year}${random}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse form data
    const formData = await new Promise((resolve, reject) => {
      upload.none()(req, res, (err) => {
        if (err) reject(err);
        else resolve(req.body);
      });
    });

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
    } = formData;

    const registrationNumber = generateRegistrationNumber();

    // For Vercel, we'll store file references without actual file upload
    // In production, you'd use a service like Vercel Blob Storage or AWS S3
    await pool.query(
      `INSERT INTO students 
        (registration_number, full_name, gender, birth_place, birth_date, address, 
         previous_school, father_name, mother_name, whatsapp)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [registrationNumber, fullName, gender, birthPlace, birthDate, address,
        previousSchool, fatherName, motherName, whatsapp]
    );

    res.json({ 
      success: true, 
      registrationNumber,
      message: 'Pendaftaran berhasil (file upload disabled for Vercel)' 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
