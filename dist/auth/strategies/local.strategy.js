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
exports.LocalStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./../../users/users.service");
const bcrypt = require("bcrypt");
const auth_service_1 = require("../auth.service");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(userService, authService) {
        super();
        this.userService = userService;
        this.authService = authService;
    }
    async validate(username, password) {
        const user = await this.userService.findOne(username);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = await this.authService.login(user);
            return token;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], LocalStrategy);
//# sourceMappingURL=local.strategy.js.map