import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  firstname: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  age: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  profilPublic: boolean;
}
