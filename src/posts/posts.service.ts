import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from 'src/models';
import { DeletePostDto } from './dto/delete-post.dto';
import { OperationSuccess } from 'src/dto/operation_sucess';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(PostModel)
    private post_model: typeof PostModel,
  ) {}

  async create(user_id: number, createPostDto: CreatePostDto): Promise<PostModel> {
    let new_post: PostModel = new PostModel({body: createPostDto.body, creation_time: Date.now(), user_id: user_id});
    return new_post.save();
  }

  async delete(user_id: number, deletePostDto: DeletePostDto): Promise<OperationSuccess> {
    const post = await this.post_model.findOne({where: {id: deletePostDto.post_id}});
    if (!post || post.user_id != user_id) {
      throw new BadRequestException('Post not found!')
    }
    this.post_model.destroy({where: {id: deletePostDto.post_id}});
    return new OperationSuccess();
  }

  async get_user_posts(user_id: number): Promise<PostModel[]> {
    const posts: PostModel[] = await this.post_model.findAll({where: {user_id: user_id}});
    return posts;
  }

  async get_all_posts(): Promise<PostModel[]> {
    const posts: PostModel[] = await this.post_model.findAll();
    return posts;
  }
}
