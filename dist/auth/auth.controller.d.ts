import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
}
