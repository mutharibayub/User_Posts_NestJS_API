import { IsNotEmpty, MinLength } from "class-validator";

export class CreatePostDto {
    
    @IsNotEmpty()
    @MinLength(10)
    body: string;

}
