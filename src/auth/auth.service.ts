import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
    ) {}

  async sign(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

}
