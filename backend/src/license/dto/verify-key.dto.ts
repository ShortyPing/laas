import {IsNotEmpty, IsString} from "class-validator";

export class VerifyKeyDto {

    @IsString()
    @IsNotEmpty()
    key: string
}