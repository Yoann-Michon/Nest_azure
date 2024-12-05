import { PostService } from './post.service';
import { Publication } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { BlobService } from './../blob/blob.service';
export declare class PostController {
    private readonly postService;
    private readonly blobService;
    constructor(postService: PostService, blobService: BlobService);
    create(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<Publication>;
    findAll(): Promise<Publication[]>;
    update(id: number, updateBlogDto: Partial<UpdatePostDto>): Promise<Publication>;
    remove(id: string): Promise<void>;
}
