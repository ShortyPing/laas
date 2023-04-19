import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {JwtGuard} from "../auth/jwt/jwt.guard";
import {Request} from "express";
import {ProjectService} from "./project.service";
import {CreateProjectDto} from "./dto/create-project.dto";

@Controller('project')
@ApiTags("Project")
export class ProjectController {

    constructor(private projectService: ProjectService) {
    }

    @Post()
    @ApiOperation({summary: "Create project"})
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    public async createProject(@Req() request: Request, @Body() body: CreateProjectDto) {
        return await this.projectService.createProject(request.user["id"], body)
    }
}
