import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './guards/public.decorator';

@ApiTags('Authentification')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({
    description: 'User credentials required for login',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'johndoe' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Public()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  @ApiBody({
    description: 'Data required to create a new user',
    type: CreateUserDto,
    examples: {
      'application/json': {
        summary: 'Example of user registration',
        value: {
          name: 'Doe',
          firstname: 'John',
          username: 'johndoe',
          password: 'password123',
          age: 25,
          description: 'Full-Stack Developer',
          profilPublic: true,
        },
      },
    },
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
}
