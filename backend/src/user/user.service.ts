import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../_services/prisma/prisma.service";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt'
import {LoginDto} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {


    constructor(private prismaService: PrismaService, private jwtService: JwtService) {
    }


    async createUser(data: CreateUserDto) {
        let user = await this.prismaService.user.findFirst({
            where: {
                username: {
                    equals: data.username,
                    mode: "insensitive"
                }
            }
        });


        if(user)
            throw new ConflictException("Username is already taken")

        let hash = await bcrypt.hash(data.password, 10);

        user = await this.prismaService.user.create({
            data: {
                username: data.username,
                password: hash
            }
        })

        return {
            status: "Ok",
            id: user.id
        }

    }

    async login(data: LoginDto) {

        let user = await this.prismaService.user.findFirst({
            where: {
                username: data.username
            }
        })

        if(!user || !bcrypt.compareSync(data.password, user.password))
            throw new UnauthorizedException()

        

        return {
            status: "Ok",
            token: this.jwtService.sign({
                id: user.id
            })
        };
    }

    async getAllUsers() {
        let users = await this.prismaService.user.findMany()

        users.forEach(user => delete user["password"]) // exclude password field


        return {
            count: users.length,
            response: users
        }
    }

    async userCount() {
        return this.prismaService.user.count();
    }
}
