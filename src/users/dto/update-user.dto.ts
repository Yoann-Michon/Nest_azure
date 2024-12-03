// src/users/dto/update-user.dto.ts
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  username?: string;
  password?: string;
}
