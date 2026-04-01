import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['auth-user'];
    if(!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

      try {
        const decoded = jwt.verify(authHeader, process.env.SECRET!) as {userId?: number};
        if (!decoded.userId) {
          throw new UnauthorizedException('Invalid token: UserId missing');
        }
    next();
    }
    catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
