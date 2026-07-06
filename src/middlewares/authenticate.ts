import dotenv from 'dotenv'
import type { NextFunction, Request, Response } from 'express';

dotenv.config();

const TOKEN = process.env.TOKEN;

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const payload = req.headers['authorization'];

  if (!payload) {
    res.status(400).json({
      error: 'No authorization token was provided.'
    });
    return;
  }

  const token = payload.split(' ')[1];

  if (!token) {
    res.status(400).json({ error: 'Bad request' });
    return;
  }

  if (token !== TOKEN) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  next();
}
