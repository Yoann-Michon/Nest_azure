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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const post_service_1 = require("./post.service");
const post_entity_1 = require("./entities/post.entity");
const update_post_dto_1 = require("./dto/update-post.dto");
const create_post_dto_1 = require("./dto/create-post.dto");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async create(createPostDto) {
        return await this.postService.create(createPostDto);
    }
    async findAll() {
        return await this.postService.findAll();
    }
    async update(id, updateBlogDto) {
        return await this.postService.update(+id, updateBlogDto);
    }
    async remove(id) {
        return await this.postService.remove(+id);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle publication' }),
    (0, swagger_1.ApiBody)({
        type: create_post_dto_1.CreatePostDto,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Publication créée avec succès.',
        type: post_entity_1.Publication,
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
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Requête invalide.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les publications' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des publications récupérée avec succès.',
        type: [post_entity_1.Publication],
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une publication' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la publication à mettre à jour', type: Number }),
    (0, swagger_1.ApiBody)({
        type: update_post_dto_1.UpdatePostDto,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Publication mise à jour avec succès.',
        type: post_entity_1.Publication,
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
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Publication non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une publication' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la publication à supprimer', type: Number }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Publication supprimée avec succès.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Publication non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "remove", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiTags)('Posts'),
    (0, common_1.Controller)('api/posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map