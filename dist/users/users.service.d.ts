import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private usersRepository;
    [x: string]: any;
    constructor(usersRepository: Repository<User>);
    findOne(username: string): Promise<User>;
    create(user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    update(id: number, userDto: Partial<CreateUserDto>): Promise<User>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
