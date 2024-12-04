import { IsString, IsNotEmpty, IsOptional, IsInt, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;
}
