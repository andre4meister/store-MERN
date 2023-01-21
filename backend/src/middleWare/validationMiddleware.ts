import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export default function validationMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'validation error',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Validation error', error });
  }
}
