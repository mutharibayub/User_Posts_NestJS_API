import { IsNotEmpty } from "class-validator";

export class DeletePostDto {
    
    @IsNotEmpty()
    post_id: number

}
