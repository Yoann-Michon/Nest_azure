import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ user: User; token: string }> {
    const user = await this.authService.register(createUserDto);

    const token = await this.authService.login(user);

    return { user, token: token.access_token };
  }
}
