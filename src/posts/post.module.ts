import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import {  PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Publication} from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publication])],
  controllers: [PostController],
  providers: [PostService, 
  ],
  exports:[PostService]
})
export class PostModule {}
