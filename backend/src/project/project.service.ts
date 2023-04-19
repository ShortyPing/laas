import { Injectable } from '@nestjs/common';
import {PrismaService} from "../_services/prisma/prisma.service";
import {CreateProjectDto} from "./dto/create-project.dto";

@Injectable()
export class ProjectService {


    constructor(private prismaService: PrismaService) {
    }


    public async createProject(userId: string, data: CreateProjectDto) {

        let project = await this.prismaService.project.create({
            data: {
                name: data.name,
                userId: userId,
                defaultLicenseTemplate: data.defaultTemplate
            }
        })

        return {
            status: "Ok",
            id: project.id
        }
    }
}
