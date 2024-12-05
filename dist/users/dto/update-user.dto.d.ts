import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    name?: string;
    firstname?: string;
    username?: string;
    password?: string;
    age?: number;
    description?: string;
    profilPublic?: boolean;
    isActive?: boolean;
}
export {};
