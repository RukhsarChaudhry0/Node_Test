import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Authentication failed'
    });
  }
}

export default authenticate;
