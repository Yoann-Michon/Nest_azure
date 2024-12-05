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
exports.LocalAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./../auth.service");
const users_service_1 = require("../../users/users.service");
const bcrypt = require("bcrypt");
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
    constructor(authService, userService) {
        super();
        this.authService = authService;
        this.userService = userService;
    }
    async validate(username, password) {
        const user = await this.userService.findOne(username);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = await this.authService.login(user);
            return token;
        }
        else {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
    }
};
exports.LocalAuthGuard = LocalAuthGuard;
exports.LocalAuthGuard = LocalAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], LocalAuthGuard);
//# sourceMappingURL=local-auth.guard.js.map