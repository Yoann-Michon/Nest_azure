import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../../token/token.service';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private reflector;
    private tokenService;
    constructor(reflector: Reflector, tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    handleRequest(err: any, user: any): any;
}
export {};
