import { AuthService } from './../auth.service';
import { UsersService } from 'src/users/users.service';
declare const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalAuthGuard extends LocalAuthGuard_base {
    private authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    validate(username: string, password: string): Promise<{
        token: string;
    }>;
}
export {};
