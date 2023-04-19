import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateProjectDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    defaultTemplate?: string
}