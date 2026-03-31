import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/passport-jwt.strategy';

dotenv.config()

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  UserModule,
  PassportModule.register({
    defaultStrategy: "jwt"
  }),
  JwtModule.register({
      secret: process.env.SECRET,
      signOptions:
      {
        expiresIn: 3600
      }
  })
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
