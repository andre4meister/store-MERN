import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {RequestWithDecodedData} from "../types/commonTypes.js";

export default function authentificationMW(req: RequestWithDecodedData, res: Response, next: NextFunction) {
  const secret = process.env.JWTSECRET as string;

  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;
      req.decodedData = decodedData;
    } else {
      const decodedData = { role: 'anonim' };
      req.decodedData = decodedData;
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: 'expire token', error });
  }
}
