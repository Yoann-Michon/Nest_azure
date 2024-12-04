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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const typeorm_2 = require("typeorm");
let PostService = class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async create(createPostDto) {
        const post = this.postRepository.create(createPostDto);
        return await this.postRepository.save(post);
    }
    async findAll() {
        try {
            return await this.postRepository.find();
        }
        catch (error) {
            throw new common_1.ConflictException();
        }
    }
    async findOne(id) {
        try {
            return await this.postRepository.findOne({ where: { id }, relations: ['user'] });
        }
        catch (error) {
            throw new common_1.ConflictException();
        }
    }
    async update(id, updateBlogDto) {
        const existingPost = await this.findOne(id);
        if (!existingPost) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found.`);
        }
        const result = await this.postRepository.update(id, updateBlogDto);
        if (result.affected !== 1) {
            throw new common_1.NotFoundException(`Failed to update post with ID ${id}.`);
        }
        return this.findOne(id);
    }
    async remove(id) {
        let done = await this.postRepository.delete(id);
        if (done.affected != 1)
            throw new common_1.NotFoundException(id);
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Publication)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map