const pool = require('../db');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}
