import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../_services/prisma/prisma.service";
import {CreateProjectDto} from "./dto/create-project.dto";
import {Prisma} from "@prisma/client";

@Injectable()
export class ProjectService {


    constructor(private prismaService: PrismaService) {
    }


    public async createProject(userId: string, data: CreateProjectDto) {

        let project = await this.prismaService.project.create({
            data: {
                name: data.name,
                userId: userId,
                defaultLicenseTemplate: data.defaultTemplate || undefined
            }
        })

        return {
            status: "Ok",
            id: project.id
        }
    }

    public async getProjects(query: Prisma.ProjectWhereInput) {
        return this.prismaService.project.findMany({
            where: query
        })
    }

    public async deleteProject(id: string, userId?: string, administrative?: boolean) {
        if(!userId && !administrative)
            throw new ForbiddenException();

        let project = await this.prismaService.project.findFirst({
            where: {
                id: id
            }
        });

        if(!project)
            throw new NotFoundException();

        if((project.userId != userId) && !administrative)
            throw new ForbiddenException();

        await this.prismaService.project.delete({
            where: {
                id: id
            }
        });

        return {
            status: "Deleted"
        }

    }
}
