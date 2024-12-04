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

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiBody({ 
    type: CreateUserDto,
    examples: {
      'application/json': {
        summary: 'Exemple de données pour la création d’un utilisateur',
        value: {
          name: 'John',
          firstname: 'Doe',
          username: 'johndoe',
          password: 'password123',
          age: 30,
          description: 'Développeur full-stack',
          profilPublic: true
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé avec succès.',
    type: User,
    examples: {
      'application/json': {
        summary: 'Utilisateur créé avec succès',
        value: {
          id: 1,
          name: 'John',
          firstname: 'Doe',
          username: 'johndoe',
          password: 'hashedpassword',
          age: 30,
          description: 'Développeur full-stack',
          profilPublic: true
        }
      }
    }
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
    type: [User],
    examples: {
      'application/json': {
        summary: 'Liste des utilisateurs',
        value: [
          {
            id: 1,
            name: 'John',
            firstname: 'Doe',
            username: 'johndoe',
            password: 'hashedpassword',
            age: 30,
            description: 'Développeur full-stack',
            profilPublic: true
          },
          {
            id: 2,
            name: 'Jane',
            firstname: 'Doe',
            username: 'janedoe',
            password: 'hashedpassword',
            age: 25,
            description: 'Designer UI/UX',
            profilPublic: false
          }
        ]
      }
    }
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son pseudo' })
  @ApiParam({
    name: 'Pseudo',
    description: 'Pseudo de l’utilisateur à récupérer',
    type: String
  })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur trouvé',
    type: User,
    examples: {
      'application/json': {
        summary: 'Utilisateur trouvé',
        value: {
          id: 1,
          name: 'John',
          firstname: 'Doe',
          username: 'johndoe',
          password: 'hashedpassword',
          age: 30,
          description: 'Développeur full-stack',
          profilPublic: true
        }
      }
    }
  })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiParam({
    name: 'id',
    description: 'ID de l’utilisateur à mettre à jour',
    type: Number
  })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      'application/json': {
        summary: 'Exemple de données pour la mise à jour d’un utilisateur',
        value: {
          name: 'John',
          firstname: 'Doe',
          username: 'johndoeUpdated',
          password: 'newpassword123',
          age: 31,
          description: 'Développeur full-stack expérimenté',
          profilPublic: false
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès.',
    type: User,
    examples: {
      'application/json': {
        summary: 'Utilisateur mis à jour',
        value: {
          id: 1,
          name: 'John',
          firstname: 'Doe',
          username: 'johndoeUpdated',
          password: 'hashedpassword',
          age: 31,
          description: 'Développeur full-stack expérimenté',
          profilPublic: false
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  async update(@Param('id') id: string, @Body() userDto: CreateUserDto) {
    return await this.usersService.update(+id, userDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({
    name: 'id',
    description: 'ID de l’utilisateur à supprimer',
    type: Number
  })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur supprimé avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
