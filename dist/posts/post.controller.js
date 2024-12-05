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
const blob_service_1 = require("../blob/blob.service");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const public_decorator_1 = require("../auth/guards/public.decorator");
let PostController = class PostController {
    constructor(postService, blobService) {
        this.postService = postService;
        this.blobService = blobService;
    }
    async create(createPostDto, file) {
        let fileUrl = null;
        if (file) {
            fileUrl = await this.blobService.uploadFile(file);
        }
        return await this.postService.create({
            ...createPostDto,
            fileUrl,
        });
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
    (0, swagger_1.ApiOperation)({ summary: 'Create a new post' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Post successfully created.',
        type: post_entity_1.Publication,
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
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid request.' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all posts' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of posts retrieved successfully.',
        type: [post_entity_1.Publication],
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a post' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the post to update',
        type: Number,
    }),
    (0, swagger_1.ApiBody)({
        type: update_post_dto_1.UpdatePostDto,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Post successfully updated.',
        type: post_entity_1.Publication,
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
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post not found.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a post' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the post to delete',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Post successfully deleted.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "remove", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiTags)('Posts'),
    (0, common_1.Controller)('api/posts'),
    __metadata("design:paramtypes", [post_service_1.PostService,
        blob_service_1.BlobService])
], PostController);
//# sourceMappingURL=post.controller.js.map