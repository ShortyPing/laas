import {IsBoolean, IsBooleanString, IsNotEmpty, IsString} from "class-validator";
import {ApiParam, ApiProperty} from "@nestjs/swagger";

export class EnableDisableKeyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    key: string

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    status: boolean

}