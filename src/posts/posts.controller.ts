import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Post as PostEntity } from '../models/post.model'
import { OperationSuccess } from 'src/dto/operation_sucess';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async Create(@Req() request: Request, @Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postsService.create(request['user']['sub'], createPostDto);
  }

  @UseGuards(AuthGuard)
  @Post('delete')
  async Delete(@Req() request: Request, @Body() deletePostDto: DeletePostDto): Promise<OperationSuccess> {
    return await this.postsService.delete(request['user']['sub'], deletePostDto);
  }

  @UseGuards(AuthGuard)
  @Get('')
  async GetMyPosts(@Req() request: Request): Promise<PostEntity[]> {
    return await this.postsService.get_user_posts(request['user']['sub']);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async GetAllPosts(@Req() request: Request): Promise<PostEntity[]> {
    return await this.postsService.get_all_posts();
  }
}
