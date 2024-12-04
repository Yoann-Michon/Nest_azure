import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PostService } from './post.service';
import { Publication } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('Posts')
@Controller('api/posts')
export class PostController {
  constructor(private readonly postService: PostService, 
    //private readonly blobService: BlobService

  ) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle publication' })
  @ApiBody({ 
    type: CreatePostDto,
    examples: {
      'application/json': { 
        summary: 'Exemple de création d’une publication',
        value: {
          title: 'Titre de la publication',
          content: 'Contenu de la publication',
          fileUrl: 'http://example.com/image.jpg',
          userId: 1
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Publication créée avec succès.',
    type: Publication,
    examples: {
      'application/json': {
        summary: 'Publication créée',
        value: {
          id: 1,
          title: 'Titre de la publication',
          content: 'Contenu de la publication',
          fileUrl: 'http://example.com/image.jpg',
          userId: 1,
          createdAt: '2024-12-03T12:00:00',
          updatedAt: '2024-12-03T12:00:00'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Requête invalide.' }) 
  async create(@Body() createPostDto: CreatePostDto, @UploadedFile() file: Express.Multer.File): Promise<Publication> {
    let fileUrl: string | null = null;

    if (file) {
      //fileUrl = await this.blobService.uploadFile(file);
    }

    const publication = await this.postService.create({
      ...createPostDto,
      fileUrl
    });

    return publication;
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les publications' })
  @ApiResponse({
    status: 200,
    description: 'Liste des publications récupérée avec succès.',
    type: [Publication],
    examples: {
      'application/json': {
        summary: 'Liste des publications',
        value: [
          {
            id: 1,
            title: 'Titre de la publication',
            content: 'Contenu de la publication',
            fileUrl: 'http://example.com/image1.jpg',
            userId: 1,
            createdAt: '2024-12-03T12:00:00',
            updatedAt: '2024-12-03T12:00:00'
          },
          {
            id: 2,
            title: 'Deuxième publication',
            content: 'Contenu de la deuxième publication',
            fileUrl: 'http://example.com/image2.jpg',
            userId: 2,
            createdAt: '2024-12-03T13:00:00',
            updatedAt: '2024-12-03T13:00:00'
          }
        ]
      }
    }
  })
  async findAll() {
    return await this.postService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une publication' })
  @ApiParam({ name: 'id', description: 'ID de la publication à mettre à jour', type: Number })
  @ApiBody({
    type: UpdatePostDto,
    examples: {
      'application/json': {
        summary: 'Exemple de mise à jour de publication',
        value: {
          title: 'Titre mis à jour',
          content: 'Contenu mis à jour',
          fileUrl: 'http://example.com/imageUpdated.jpg'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Publication mise à jour avec succès.',
    type: Publication,
    examples: {
      'application/json': {
        summary: 'Publication mise à jour',
        value: {
          id: 1,
          title: 'Titre mis à jour',
          content: 'Contenu mis à jour',
          fileUrl: 'http://example.com/imageUpdated.jpg',
          userId: 1,
          createdAt: '2024-12-03T12:00:00',
          updatedAt: '2024-12-03T14:00:00'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Publication non trouvée.' })
  async update(@Param('id') id: number, updateBlogDto: UpdatePostDto) {
    return await this.postService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une publication' })
  @ApiParam({ name: 'id', description: 'ID de la publication à supprimer', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Publication supprimée avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Publication non trouvée.' })
  async remove(@Param('id') id: string) {
    return await this.postService.remove(+id);
  }
}
