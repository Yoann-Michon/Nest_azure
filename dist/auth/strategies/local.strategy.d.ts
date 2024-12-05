import { Strategy } from 'passport-local';
import { UsersService } from './../../users/users.service';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userService;
    private readonly authService;
    constructor(userService: UsersService, authService: AuthService);
    validate(username: string, password: string): Promise<{
        token: string;
    }>;
}
export {};
