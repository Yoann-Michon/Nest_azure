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

  findAll() {
    try {
      return this.postRepository.find();
    } catch (error) {
      throw new ConflictException();
    }
  }

  findOne(id: number) {
    try {
      return this.postRepository.findOne({ where: { id }, relations: ['user'] });
    } catch (error) {
      throw new ConflictException();
    }
  }

  async update(id: number, updateBlogDto: UpdatePostDto) {
    let done = await this.postRepository.update(id, updateBlogDto);
    if (done.affected != 1) throw new NotFoundException(id);
    return this.findOne(id);
  }

  async remove(id: number) {
    let done: DeleteResult = await this.postRepository.delete(id);
    if (done.affected != 1) throw new NotFoundException(id);
  }
}