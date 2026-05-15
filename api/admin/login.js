const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}
