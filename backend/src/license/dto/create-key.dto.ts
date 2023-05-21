import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsDateString, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateKeyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    licensedTo: string
    @ApiProperty({required: false})
    @IsDateString()
    @IsNotEmpty()
    @IsNotEmpty()
    expires?: Date

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    label?: string

}