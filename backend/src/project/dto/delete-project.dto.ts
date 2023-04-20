import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class DeleteProjectDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string
}