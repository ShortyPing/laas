import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {JwtGuard} from "../../auth/jwt/jwt.guard";
import {Request} from "express";
import {ProjectService} from "../../project/project.service";

@Controller('user/self')
@ApiTags("User (Self)")
export class SelfController {

    constructor(private projectService: ProjectService) {
    }

    @Get("")
    @ApiOperation({summary: "Get information about self (Own user)"})
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    public async getSelf(@Req() request: Request) {
        delete request.user["password"]
        return request.user
    }

    @Get("project")
    @ApiOperation({summary: "Get all projects for self"})
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    public async getProjects(@Req() request: Request) {
        return this.projectService.getProjects({
            userId: request.user["id"]
        })
    }
}
