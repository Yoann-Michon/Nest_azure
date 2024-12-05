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
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
        examples: {
            'application/json': {
                summary: 'Example payload for user creation',
                value: {
                    name: 'John',
                    firstname: 'Doe',
                    username: 'johndoe',
                    password: 'password123',
                    age: 30,
                    description: 'Full-stack developer',
                    profilPublic: true,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User successfully created.',
        type: user_entity_1.User,
        examples: {
            'application/json': {
                summary: 'User successfully created',
                value: {
                    id: 1,
                    name: 'John',
                    firstname: 'Doe',
                    username: 'johndoe',
                    password: 'hashedpassword',
                    age: 30,
                    description: 'Full-stack developer',
                    profilPublic: true,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all users' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of users successfully retrieved.',
        type: [user_entity_1.User],
        examples: {
            'application/json': {
                summary: 'List of users',
                value: [
                    {
                        id: 1,
                        name: 'John',
                        firstname: 'Doe',
                        username: 'johndoe',
                        password: 'hashedpassword',
                        age: 30,
                        description: 'Full-stack developer',
                        profilPublic: true,
                    },
                    {
                        id: 2,
                        name: 'Jane',
                        firstname: 'Doe',
                        username: 'janedoe',
                        password: 'hashedpassword',
                        age: 25,
                        description: 'UI/UX designer',
                        profilPublic: false,
                    },
                ],
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a user by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the user to retrieve',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User found.',
        type: [user_entity_1.User],
        examples: {
            'application/json': {
                summary: 'User',
                value: [
                    {
                        id: 1,
                        name: 'John',
                        firstname: 'Doe',
                        username: 'johndoe',
                        age: 30,
                        description: 'Full-stack developer',
                        profilPublic: true,
                    },
                ],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User found',
        type: user_entity_1.User,
        examples: {
            'application/json': {
                summary: 'User found',
                value: {
                    id: 1,
                    name: 'John',
                    firstname: 'Doe',
                    username: 'johndoe',
                    password: 'hashedpassword',
                    age: 30,
                    description: 'Full-stack developer',
                    profilPublic: true,
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the user to update',
        type: Number,
    }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
        examples: {
            'application/json': {
                summary: 'Example payload for updating a user',
                value: {
                    name: 'John',
                    firstname: 'Doe',
                    username: 'johndoeUpdated',
                    password: 'newpassword123',
                    age: 31,
                    description: 'Experienced full-stack developer',
                    profilPublic: false,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User successfully updated.',
        type: user_entity_1.User,
        examples: {
            'application/json': {
                summary: 'User successfully updated',
                value: {
                    id: 1,
                    name: 'John',
                    firstname: 'Doe',
                    username: 'johndoeUpdated',
                    password: 'hashedpassword',
                    age: 31,
                    description: 'Experienced full-stack developer',
                    profilPublic: false,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the user to delete',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
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