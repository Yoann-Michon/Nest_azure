import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { Token } from '../token/entities/token.entity';
import { TokenService } from '../token/token.service';
import * as dotenv from 'dotenv';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TokenModule } from '../token/token.module';
dotenv.config();


@Module({
  imports: [
    UsersModule,
    PassportModule,
    TokenModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, LocalAuthGuard, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
