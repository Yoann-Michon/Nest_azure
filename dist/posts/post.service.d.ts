import { Publication } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostService {
    private postRepository;
    constructor(postRepository: Repository<Publication>);
    create(createPostDto: CreatePostDto): Promise<Publication>;
    findAll(): Promise<Publication[]>;
    findOne(id: number): Promise<Publication>;
    update(id: number, updateBlogDto: Partial<UpdatePostDto>): Promise<Publication>;
    remove(id: number): Promise<void>;
}
