// src/users/dto/update-user.dto.ts
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string;
  firstname?: string;
  username?: string;
  password?: string;
  age?: number;
  description?: string;
  profilPublic?: boolean;
  isActive?:boolean
}
