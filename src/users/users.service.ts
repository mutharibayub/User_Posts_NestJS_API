import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly user_repository: Repository<User>,
    private authService: AuthService,
    ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing_user =  await this.user_repository.findOne(
      { where:
        { email: createUserDto.email }
      }
    )
    if (existing_user != null) {
      throw new BadRequestException("Account with this email already exists");
    }
    const user = await this.user_repository.create(createUserDto)
    return this.user_repository.save(user);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.user_repository.findOne(
      {where: {email: loginUserDto.email}}
    );
    if (user.email !== loginUserDto.email || user.password !== loginUserDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return ({
      access_token: await this.authService.sign(payload),
    });
    
  }

}
