import { NextFunction, Request, Response } from 'express';
import { User } from '../user-model/user-controller';

export default async function checkModeratorRole(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const id: string = req.body.decodedData._id;
    const user = await User.findById(id);
    if (!['moderator', 'admin'].includes(user.role)) {
      return res.status(403).json({ message: 'you have no rights to do this operation' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Something bad in moderator role check', error });
  }
}
