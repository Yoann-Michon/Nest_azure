import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    await this.tokenService.saveToken(accessToken, user);

    return {
      access_token: accessToken,
    };
  }

  async register(user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }
}
