const pool = require('../db');

export default async function handler(req, res) {
  if (req.method === 'PUT') {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
