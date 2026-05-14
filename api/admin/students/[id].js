const pool = require('../../db');

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { status } = req.body;

    try {
      await pool.query('UPDATE students SET status = $1 WHERE id = $2', [status, id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
