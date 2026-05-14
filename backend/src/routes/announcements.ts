import { Router } from 'express';
import { prisma } from '../prisma.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = Router();

router.get('/', async (req, res) => {
  const announcements = await prisma.announcement.findMany({ orderBy: { publishedAt: 'desc' } });
  res.json(announcements);
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, content, status } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Judul dan konten diperlukan' });

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const announcement = await prisma.announcement.create({
    data: { title, content, slug, status: status || 'PUBLISHED' }
  });
  res.status(201).json(announcement);
});

export default router;
