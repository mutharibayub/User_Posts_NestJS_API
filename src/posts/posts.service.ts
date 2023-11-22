import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostEntity } from 'src/typeorm';
import { DeletePostDto } from './dto/delete-post.dto';
import { OperationSuccess } from 'src/dto/operation_sucess';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(PostEntity) private readonly post_repository: Repository<PostEntity>
    ) {}

  async create(user_id: number, createPostDto: CreatePostDto): Promise<PostEntity> {
    let new_post: PostEntity = new PostEntity();
    new_post.user_id = user_id;
    new_post.body = createPostDto.body;
    const post = await this.post_repository.create(new_post);
    return this.post_repository.save(post);
  }

  async delete(user_id: number, deletePostDto: DeletePostDto): Promise<OperationSuccess> {
    const post = await this.post_repository.findOne({where: {id: deletePostDto.post_id}});
    if (!post || post.user_id != user_id) {
      throw new BadRequestException('Post not found!')
    }
    this.post_repository.remove(post);
    return new OperationSuccess();
  }

  async get_user_posts(user_id: number): Promise<PostEntity[]> {
    const posts: PostEntity[] = await this.post_repository.find({where: {user_id: user_id}});
    return posts;
  }

  async get_all_posts(): Promise<PostEntity[]> {
    const posts: PostEntity[] = await this.post_repository.find();
    return posts;
  }
}
