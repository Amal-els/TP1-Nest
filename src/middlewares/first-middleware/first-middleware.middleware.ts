import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FirstMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("Hello from 1st middleware ");
    next();
  }
}
