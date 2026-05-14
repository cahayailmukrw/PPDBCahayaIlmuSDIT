const { Pool } = require('pg');
require('dotenv').config();

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

    const bcrypt = require('bcryptjs');
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
    
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Database initialization error:', err);
    throw err;
  }
}

// Initialize database on module load
initializeDatabase().catch(err => {
  console.error('Failed to initialize database:', err);
});

module.exports = pool;
