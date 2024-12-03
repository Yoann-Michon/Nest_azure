import { Strategy } from 'passport-local';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userService;
    constructor(userService: UsersService);
    validate(username: string, password: string): Promise<User>;
}
export {};
