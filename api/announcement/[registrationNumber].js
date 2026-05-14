const pool = require('../db');

export default async function handler(req, res) {
  const { registrationNumber } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}
