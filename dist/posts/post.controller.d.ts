import { PostService } from './post.service';
import { Publication } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<Publication>;
    findAll(): Promise<Publication[]>;
    update(id: number, updateBlogDto: UpdatePostDto): Promise<Publication>;
    remove(id: string): Promise<void>;
}
