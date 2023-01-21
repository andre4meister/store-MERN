import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import secretJWT from '../utils/secret';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized', error: 'expire token' });
    }

    const decodedData = jwt.verify(token, secretJWT);
    req.body.decodedData = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'expire token', error });
  }
}
