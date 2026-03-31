
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PayloadInterface } from '../interfaces/payload-interface';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    const secret = process.env.SECRET;
    if (!secret) {
      throw new Error('SECRET is not defined in .env');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: PayloadInterface) {
    const userFound = await this.userRepository.findOne({ 
        where: { username: payload.username } 
    });    
    if (userFound) {
        //const {password, ...result} = user;
        //return result;
        const {password, ...user} = userFound;
        return user;

    }
    else {
        throw new UnauthorizedException();
    }
  }
  
}

