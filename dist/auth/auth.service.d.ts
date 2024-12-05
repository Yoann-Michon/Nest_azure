import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { TokenService } from './token.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private tokenService;
    constructor(usersService: UsersService, jwtService: JwtService, tokenService: TokenService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: User): Promise<{
        token: string;
    }>;
    register(user: Partial<User>): Promise<User>;
}
