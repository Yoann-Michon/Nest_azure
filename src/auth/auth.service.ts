import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './../users/entities/user.entity';
import { TokenService } from '../token/token.service';

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

  async login(user: User): Promise<{ token: string }> {
    try {
      const payload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      await this.tokenService.saveToken(accessToken, user);

      return {
        token: accessToken,
      };
    } catch (error) {
      throw new Error("An error occurred while generating the token.");
    }
  }

  async register(user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }
}
