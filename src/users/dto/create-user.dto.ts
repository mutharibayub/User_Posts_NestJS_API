import { IsEmail, IsNotEmpty, IsNumber, MaxLength, MinLength } from '@nestjs/class-validator';

export class CreateUserDto {
    
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(256)
    name: string;
 
    @IsNotEmpty()
    @IsEmail()
    email: string;
 
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(256)
    password: string;

}
