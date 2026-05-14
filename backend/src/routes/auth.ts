import { Router } from 'express';
import { prisma } from '../prisma.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email dan password dibutuhkan' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Email atau password salah' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'supersecretppdb', {
    expiresIn: '12h'
  });

  res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
});

router.post('/register-admin', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ message: 'Data admin lengkap diperlukan' });

  const hashed = await bcrypt.hash(password, 10);
  const admin = await prisma.user.create({
    data: { email, password: hashed, name, role: 'ADMIN' }
  });
  res.status(201).json({ id: admin.id, email: admin.email, name: admin.name });
});

export default router;
