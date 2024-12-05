import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { User } from './../../users/entities/user.entity';
import { UsersService } from './../../users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<{token: string }> {
    const user: User = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = await this.authService.login(user); 
      
    return token;
    } else {
      throw new UnauthorizedException();
    }
  }
}
