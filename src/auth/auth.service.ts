import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './../users/entities/user.entity';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  [x: string]: any;
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
      console.log('Payload:', payload);

      const accessToken = this.jwtService.sign(payload);
      console.log('Access token generated:', accessToken);

      await this.tokenService.saveToken(accessToken, user);
      console.log('Token saved successfully.');

      user.isActive = true;
      await this.usersService.update(user.id, { isActive: true });
      return { token: accessToken };
    } catch (error) {
      console.error('Error in AuthService login:', error.message);
      throw new Error('An error occurred while generating the token.');
    }
  }

  async register(user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }

  async logout(user: User): Promise<void> {
    user.isActive = false;
    await this.userRepository.save(user);
  }
  
}
