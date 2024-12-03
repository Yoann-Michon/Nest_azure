import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PostService } from './post.service';
import { Publication } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto'
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle publication' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, description: 'Publication créée avec succès.', type: Publication })
  @ApiResponse({ status: 400, description: 'Requête invalide.' }) 
  async create(@Body() createPostDto: CreatePostDto ): Promise<Publication>  {
    return await this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les publications' }) 
  @ApiResponse({ status: 200, description: 'Liste des publications récupérée avec succès.', type: [Publication] }) 
  async findAll() {
    return await this.postService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une publication' }) 
  @ApiParam({ name: 'id', description: 'ID de la publication à mettre à jour', type: Number }) 
  @ApiBody({ type: UpdatePostDto }) 
  @ApiResponse({ status: 200, description: 'Publication mise à jour avec succès.', type: Publication }) 
  @ApiResponse({ status: 404, description: 'Publication non trouvée.' }) 
  async update(@Param('id') id: number, updateBlogDto: UpdatePostDto) {
      return await this.postService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une publication' }) 
  @ApiParam({ name: 'id', description: 'ID de la publication à supprimer', type: Number }) 
  @ApiResponse({ status: 200, description: 'Publication supprimée avec succès.' }) 
  @ApiResponse({ status: 404, description: 'Publication non trouvée.' }) 
  async remove(@Param('id') id: string) {
    return await this.postService.remove(+id);
  }
}