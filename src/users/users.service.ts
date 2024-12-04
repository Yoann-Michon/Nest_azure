import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  [x: string]: any;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(user: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(id: number, userDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.usersRepository.remove(user);
    return { message: `User with ID ${id} has been removed` };
  }
}
