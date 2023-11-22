import { IsEmail, IsNotEmpty, IsNumber, MaxLength, MinLength } from '@nestjs/class-validator';

export class LoginUserDto {
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
 
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(256)
    password: string;

}
