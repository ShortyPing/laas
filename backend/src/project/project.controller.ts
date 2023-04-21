import {Body, Controller, Delete, Post, Query, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiQuery, ApiTags} from "@nestjs/swagger";
import {JwtGuard} from "../auth/jwt/jwt.guard";
import {Request} from "express";
import {ProjectService} from "./project.service";
import {CreateProjectDto} from "./dto/create-project.dto";
import {DeleteProjectDto} from "./dto/delete-project.dto";

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

    @Delete()
    @ApiOperation({summary: "Delete a project"})
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiQuery({name: "id"})
    public async deleteProject(@Query() query: DeleteProjectDto, @Req() request: Request) {
        return await this.projectService.deleteProject(query.id, request.user["id"])
    }
}
