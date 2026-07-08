import type { NextFunction, Request, Response } from 'express';

export function authenticate({ key }: { key: string }) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
      res.status(403).json({
        error: 'Invalid Token',
      });
      return;
    }

    const key = token.split(' ')[1];

    if (!token) {
      res.status(403).json({
        error: 'Invalid Token',
      });
      return;
    }

    if (token !== key) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    next();
  };
}
