import { IsString, IsOptional, IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  profilPublic: boolean;
}
