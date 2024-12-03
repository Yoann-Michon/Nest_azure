import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiOperation, ApiBody, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { Publication } from 'src/posts/entities/post.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle publication' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({
    status: 201,
    description: 'Publication créée avec succès.',
    type: Publication,
  })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs récupérée avec succès.',
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une publication' })
  @ApiParam({
    name: 'id',
    description: 'ID de la publication à mettre à jour',
    type: Number,
  }) 
  @ApiBody({ type: UpdatePostDto }) 
  @ApiResponse({
    status: 200,
    description: 'Publication mise à jour avec succès.',
    type: Publication,
  }) 
  @ApiResponse({ status: 404, description: 'Publication non trouvée.' })
  async update(@Param('id') id: string, @Body() userDto: CreateUserDto) {
    return await this.usersService.update(+id, userDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une publication' })
  @ApiParam({
    name: 'id',
    description: 'ID de la publication à supprimer',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Publication supprimée avec succès.',
  }) 
  @ApiResponse({ status: 404, description: 'Publication non trouvée.' }) 
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
