import { IsString, IsNotEmpty, IsOptional, IsInt, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsUrl()
  @IsOptional()
  fileUrl?: string;
}
