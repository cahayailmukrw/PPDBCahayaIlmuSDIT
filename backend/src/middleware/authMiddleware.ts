import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  try {
    const secret = process.env.JWT_SECRET || 'supersecretppdb';
    const payload = jwt.verify(token, secret) as { id: string; role: string };
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
}
