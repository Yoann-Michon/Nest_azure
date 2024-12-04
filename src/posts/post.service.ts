import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/post.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Publication) private postRepository: Repository<Publication>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Publication> {
    const post = this.postRepository.create(createPostDto);
    return await this.postRepository.save(post);
  }

  async findAll() {
    try {
      return await this.postRepository.find();
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.postRepository.findOne({ where: { id }, relations: ['user'] });
    } catch (error) {
      throw new ConflictException();
    }
  }

  async update(id: number, updateBlogDto: Partial<UpdatePostDto>):Promise<Publication>  {
  const existingPost = await this.findOne(id);
  if (!existingPost) {
    throw new NotFoundException(`Post with ID ${id} not found.`);
  }
  const result = await this.postRepository.update(id, updateBlogDto);
  if (result.affected !== 1) {
    throw new NotFoundException(`Failed to update post with ID ${id}.`);
  }
  return this.findOne(id);
  }

  async remove(id: number) {
    let done: DeleteResult = await this.postRepository.delete(id);
    if (done.affected != 1) throw new NotFoundException(id);
  }
}