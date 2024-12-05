import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { Publication } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { BlobService } from 'src/blob/blob.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/guards/public.decorator';

@ApiTags('Posts')
@Controller('api/posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly blobService: BlobService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', maxLength: 255 },
        content: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
          nullable: true,
        },
      },
    },
    examples: {
      'multipart/form-data': {
        summary: 'Example of file upload',
        value: {
          title: 'Post title',
          content: 'Post content',
          file: '(Select a file here)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Post successfully created.',
    type: Publication,
    examples: {
      'application/json': {
        summary: 'Created post',
        value: {
          id: 1,
          title: 'Post title',
          content: 'Post content',
          fileUrl: 'http://example.com/image.jpg',
          createdAt: '2024-12-03T12:00:00',
          updatedAt: '2024-12-03T12:00:00',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Publication> {
    let fileUrl: string | null = null;

    if (file) {
      fileUrl = await this.blobService.uploadFile(file);
    }

    return await this.postService.create({
      ...createPostDto,
      fileUrl,
    });
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Retrieve all posts' })
  @ApiResponse({
    status: 200,
    description: 'List of posts retrieved successfully.',
    type: [Publication],
    examples: {
      'application/json': {
        summary: 'List of posts',
        value: [
          {
            id: 1,
            title: 'Post title',
            content: 'Post content',
            fileUrl: 'http://example.com/image1.jpg',
            userId: 1,
            createdAt: '2024-12-03T12:00:00',
            updatedAt: '2024-12-03T12:00:00',
          },
          {
            id: 2,
            title: 'Second post',
            content: 'Second post content',
            fileUrl: 'http://example.com/image2.jpg',
            userId: 2,
            createdAt: '2024-12-03T13:00:00',
            updatedAt: '2024-12-03T13:00:00',
          },
        ],
      },
    },
  })
  async findAll() {
    return await this.postService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiParam({
    name: 'id',
    description: 'ID of the post to update',
    type: Number,
  })
  @ApiBody({
    type: UpdatePostDto,
    examples: {
      'application/json': {
        summary: 'Example of post update',
        value: {
          title: 'Updated title',
          content: 'Updated content',
          fileUrl: 'http://example.com/imageUpdated.jpg',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Post successfully updated.',
    type: Publication,
    examples: {
      'application/json': {
        summary: 'Updated post',
        value: {
          id: 1,
          title: 'Updated title',
          content: 'Updated content',
          fileUrl: 'http://example.com/imageUpdated.jpg',
          userId: 1,
          createdAt: '2024-12-03T12:00:00',
          updatedAt: '2024-12-03T14:00:00',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateBlogDto: Partial<UpdatePostDto>,
  ) {
    return await this.postService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({
    name: 'id',
    description: 'ID of the post to delete',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Post successfully deleted.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async remove(@Param('id') id: string) {
    return await this.postService.remove(+id);
  }
}
