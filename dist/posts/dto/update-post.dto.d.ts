import { CreatePostDto } from './create-post.dto';
declare const UpdatePostDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePostDto>>;
export declare class UpdatePostDto extends UpdatePostDto_base {
    id: number;
    title?: string;
    content?: string;
    fileUrl?: string;
}
export {};
