import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
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
      console.log(token);
      
    return token;
    } else {
      throw new UnauthorizedException();
    }
  }
}
