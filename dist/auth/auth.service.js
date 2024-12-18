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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const token_service_1 = require("../token/token.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, tokenService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findOne(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        try {
            const payload = { username: user.username, sub: user.id };
            console.log('Payload:', payload);
            const accessToken = this.jwtService.sign(payload);
            console.log('Access token generated:', accessToken);
            await this.tokenService.saveToken(accessToken, user);
            console.log('Token saved successfully.');
            user.isActive = true;
            await this.usersService.update(user.id, { isActive: true });
            return { token: accessToken };
        }
        catch (error) {
            console.error('Error in AuthService login:', error.message);
            throw new Error('An error occurred while generating the token.');
        }
    }
    async register(user) {
        return this.usersService.create(user);
    }
    async logout(user) {
        user.isActive = false;
        await this.userRepository.save(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        token_service_1.TokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map