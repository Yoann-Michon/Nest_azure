import { IsString, IsNotEmpty, IsOptional, IsInt, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsInt()
  userId: number;
}
