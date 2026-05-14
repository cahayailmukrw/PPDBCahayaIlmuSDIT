import { Router } from 'express';
import { prisma } from '../prisma.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = Router();

router.post('/email', authMiddleware, async (req, res) => {
  const { email, subject, message } = req.body;
  if (!email || !subject || !message) return res.status(400).json({ message: 'Email, subject, dan pesan diperlukan' });

  await prisma.notification.create({
    data: { title: subject, message, recipient: email }
  });
  res.json({ success: true, message: 'Notifikasi email terdaftar (placeholder)' });
});

router.post('/whatsapp', authMiddleware, async (req, res) => {
  const { phone, message } = req.body;
  if (!phone || !message) return res.status(400).json({ message: 'Nomor dan pesan diperlukan' });
  await prisma.notification.create({ data: { title: 'WhatsApp', message, recipient: phone } });
  res.json({ success: true, message: 'Pesan WhatsApp dikirim (placeholder)' });
});

export default router;
