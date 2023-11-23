import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user-dto';
import { User } from 'src/models';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private user_model: typeof User,
    private auth_service: AuthService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing_user: User = await this.user_model.findOne(
      { where:
        { email: createUserDto.email }
      }
    );
    if (existing_user) {
      throw new BadRequestException("Account with this email already exists");
    }
    const user = new User({email: createUserDto.email, password: createUserDto.email, name: createUserDto.name});
    return user.save();
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.user_model.findOne(
      {where: {email: loginUserDto.email, password: loginUserDto.password}}
    );
    if (!user) {
      return new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return ({
      access_token: await this.auth_service.sign(payload),
    });
    
  }

}
