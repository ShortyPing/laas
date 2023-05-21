import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get,
    Post,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {LoginDto} from "./dto/login.dto";
import {JwtGuard} from "../auth/jwt/jwt.guard";
import {Request, Response} from "express";

@Controller('user')
@ApiTags("User")
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get()
    @ApiOperation({summary: "Get all users"})
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    public async getAllUsers(@Req() request: Request) {

        return await this.userService.getAllUsers()
    }

    @Post("login")
    @ApiOperation({summary: "Login to management dashboard"})
    @ApiResponse({status: 401, description: "Login not successful"})
    @ApiResponse({status: "2XX", description: "Login successful"})
    public async login(@Body() body: LoginDto) {
        return await this.userService.login(body);
    }

    @Post("first")
    @ApiOperation({summary: "Create first admin user"})
    @ApiResponse({status: 201, description: "User successfully created"})
    @ApiResponse({status: 403, description: "Api endpoint can only be used once"})
    public async createFirstAdmin(@Body() body: CreateUserDto) {
        if ((await this.userService.userCount()) != 0) {
            throw new ForbiddenException("This api endpoint can only be used once.")
        }

        return await this.userService.createUser(body);
    }


}
