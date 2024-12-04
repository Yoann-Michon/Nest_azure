import { Publication } from '../../posts/entities/post.entity';
import { Token } from 'src/auth/entities/token.entity';
export declare class User {
    id: number;
    name: string;
    firstname: string;
    username: string;
    password: string;
    age: number;
    description: string;
    profilPublic: boolean;
    publication: Publication[];
    tokens: Token[];
}
