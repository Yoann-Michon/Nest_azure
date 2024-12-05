import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiOperation, ApiBody, ApiResponse, ApiParam, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Public } from './../auth/guards/public.decorator';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      'application/json': {
        summary: 'Example payload for user creation',
        value: {
          name: 'John',
          firstname: 'Doe',
          username: 'johndoe',
          password: 'password123',
          age: 30,
          description: 'Full-stack developer',
          profilPublic: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    type: User,
    examples: {
      'application/json': {
        summary: 'User successfully created',
        value: {
          id: 1,
          name: 'John',
          firstname: 'Doe',
          username: 'johndoe',
          password: 'hashedpassword',
          age: 30,
          description: 'Full-stack developer',
          profilPublic: true,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(userDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users successfully retrieved.',
    type: [User],
    examples: {
      'application/json': {
        summary: 'List of users',
        value: [
          {
            id: 1,
            name: 'John',
            firstname: 'Doe',
            username: 'johndoe',
            password: 'hashedpassword',
            age: 30,
            description: 'Full-stack developer',
            profilPublic: true,
          },
          {
            id: 2,
            name: 'Jane',
            firstname: 'Doe',
            username: 'janedoe',
            password: 'hashedpassword',
            age: 25,
            description: 'UI/UX designer',
            profilPublic: false,
          },
        ],
      },
    },
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the user to retrieve',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'User found.',
    type: [User],
    examples: {
      'application/json': {
        summary: 'User',
        value: [
          {
            id: 1,
            name: 'John',
            firstname: 'Doe',
            username: 'johndoe',
            age: 30,
            description: 'Full-stack developer',
            profilPublic: true,
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
    examples: {
      'application/json': {
        summary: 'User found',
        value: {
          id: 1,
          name: 'John',
          firstname: 'Doe',
          username: 'johndoe',
          password: 'hashedpassword',
          age: 30,
          description: 'Full-stack developer',
          profilPublic: true,
        },
      },
    },
  })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({
    name: 'id',
    description: 'ID of the user to update',
    type: Number,
  })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      'application/json': {
        summary: 'Example payload for updating a user',
        value: {
          name: 'John',
          firstname: 'Doe',
          username: 'johndoeUpdated',
          password: 'newpassword123',
          age: 31,
          description: 'Experienced full-stack developer',
          profilPublic: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated.',
    type: User,
    examples: {
      'application/json': {
        summary: 'User successfully updated',
        value: {
          id: 1,
          name: 'John',
          firstname: 'Doe',
          username: 'johndoeUpdated',
          password: 'hashedpassword',
          age: 31,
          description: 'Experienced full-stack developer',
          profilPublic: false,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  async update(@Param('id') id: string, @Body() userDto: Partial<CreateUserDto>) {
    return await this.usersService.update(+id, userDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({
    name: 'id',
    description: 'ID of the user to delete',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
