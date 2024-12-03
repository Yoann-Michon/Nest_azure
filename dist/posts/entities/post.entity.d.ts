import { User } from './../../users/entities/user.entity';
export declare class Publication {
    id: number;
    title: string;
    content: string;
    fileUrl: string;
    user: User;
}
