import { Publication } from '../../posts/entities/post.entity';
import { Token } from '../../token/entities/token.entity';
export declare class User {
    id: number;
    name: string;
    firstname: string;
    username: string;
    password: string;
    age: number;
    isActive: boolean;
    description: string;
    profilPublic: boolean;
    publication: Publication[];
    tokens: Token[];
}
