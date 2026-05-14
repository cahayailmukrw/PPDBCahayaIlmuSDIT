import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.ts';
import registrationRoutes from './routes/registrations.ts';
import announcementRoutes from './routes/announcements.ts';
import notificationRoutes from './routes/notifications.ts';

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'PPDB Cahaya Ilmu API' }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend berjalan di http://localhost:${port}`);
});
