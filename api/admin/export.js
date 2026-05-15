const pool = require('../db');
const ExcelJS = require('exceljs');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}
