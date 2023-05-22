import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import {JwtGuard} from "../auth/jwt/jwt.guard";
import {Request} from "express";
import {ProjectService} from "./project.service";
import {CreateProjectDto} from "./dto/create-project.dto";
import {DeleteProjectDto} from "./dto/delete-project.dto";
import {LicenseService} from "../license/license.service";
import {CreateKeyDto} from "../license/dto/create-key.dto";
import {VerifyKeyDto} from "../license/dto/verify-key.dto";
import {EnableDisableKeyDto} from "../license/dto/enable-disable-key.dto";

@Controller('project')
@ApiTags("Project")
export class ProjectController {

    constructor(private projectService: ProjectService, private licenseService: LicenseService) {
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

    @Get("/:id")
    @ApiOperation({summary: "Get infos about the project"})
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiParam({name: "id"})
    public async getInfo(@Param("id") id: string, @Req() request: Request) {
        return await this.licenseService.getInfo(id, request.user["id"])
    }

    @Get("/:id/key")
    @ApiOperation({summary: "Get all license keys from project"})
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiParam({name: "id"})
    public async getKeys(@Param("id") id: string, @Req() request: Request) {
        return this.licenseService.getKeys(id, request.user["id"]);
    }

    @Post("/:id/key")
    @ApiOperation({summary: "Generate a key"})
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiParam({name: "id"})
    public async createKey(@Param("id") id: string, @Body() body: CreateKeyDto, @Req() request: Request) {
        return await this.licenseService.createKey(id, body, request.user["id"]);
    }

    @Get("/:id/key/verify")
    @ApiOperation({summary: "Verifies an API-Key based on a project"})
    @ApiQuery({name: "key"})
    @ApiParam({name: "id"})
    public async verifyKey(@Param("id") id: string, @Query() query: VerifyKeyDto, @Req() request: Request) {

        return await this.licenseService.verifyKey(query.key, request.ip, id)
    }

    @Patch("/:id/key/enabled")
    @ApiOperation({summary: "Enables / disables key"})
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiParam({name: "id"})
    public async enableDisableKey(@Param("id") id: string, @Body() body: EnableDisableKeyDto, @Req() request: Request) {
        return this.licenseService.setKeyStatus(body.key, body.status, request.user["id"]);
    }
}
