"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_entity_1 = require("./entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(userDto) {
        return await this.usersService.create(userDto);
    }
    async findAll() {
        return await this.usersService.findAll();
    }
    async findOne(id) {
        return await this.usersService.findOne(id);
    }
    async update(id, userDto) {
        return await this.usersService.update(+id, userDto);
    }
    async remove(id) {
        return await this.usersService.remove(+id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouvel utilisateur' }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Utilisateur créé avec succès.',
        type: user_entity_1.User,
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
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Requête invalide.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les utilisateurs' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des utilisateurs récupérée avec succès.',
        type: [user_entity_1.User],
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un utilisateur par son ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID de l’utilisateur à récupérer',
        type: String
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Utilisateur trouvé.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Utilisateur trouvé',
        type: user_entity_1.User,
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
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un utilisateur' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID de l’utilisateur à mettre à jour',
        type: Number
    }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Utilisateur mis à jour avec succès.',
        type: user_entity_1.User,
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
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un utilisateur' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID de l’utilisateur à supprimer',
        type: Number
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Utilisateur supprimé avec succès.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map