import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '@/types/auth';
import { generateError } from '@/utils';

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

export const authenticateJWT = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: false,
      message: 'Authorization header missing',
    });
  }

  try {
    const splitted = authHeader.split(' ');
    const token = splitted?.[1];

    jwt.verify(token || authHeader, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error('Token invalid:', err.message);
        res.status(403).json({
          errors: [
            generateError({
              code: 403,
              title: 'Invalid token',
              description: err?.message || 'Something went wrong',
              timestamp: new Date().toISOString(),
              id: '123',
              status: 403,
            }),
          ],
        });
      } else {
        req.user = decoded as any;

        if (
          req.user.username?.toLowerCase().startsWith('guest') &&
          req.method.toLowerCase() !== 'get'
        ) {
          return res.status(403).json({
            status: false,
            message: 'Guest users cannot perform this action',
          });
        }
        next();
      }
    });
  } catch (ex) {
    res.status(400).json({
      errors: [
        generateError({
          code: 400,
          title: 'Bad Request',
          description: ex?.message || 'Something went wrong',
          timestamp: new Date().toISOString(),
          id: '123',
          status: 400,
        }),
      ],
    });
  }
};
