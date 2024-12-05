import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './../auth.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private authService: AuthService,
    private readonly userService: UsersService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<{ token: string }> {
    const user: User = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = await this.authService.login(user);
      return token;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
