import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import {  PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Publication} from './entities/post.entity';
import { BlobModule } from './../blob/blob.module';
import { TokenModule } from './../token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Publication]), BlobModule, TokenModule],
  controllers: [PostController],
  providers: [PostService],
  exports:[PostService]
})
export class PostModule {}
