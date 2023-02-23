import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.JWTSECRET as string;

  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized', error: 'expire token' });
    }

    const decodedData = jwt.verify(token, secret);
    req.body.decodedData = decodedData;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'expire token', error });
  }
}
