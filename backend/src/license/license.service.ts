import {
    ConflictException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import {PrismaService} from "../_services/prisma/prisma.service";
import {CreateKeyDto} from "./dto/create-key.dto";
import * as crypo from 'crypto'

@Injectable()
export class LicenseService {


    constructor(private prismaService: PrismaService) {
    }

    private letterPools = {
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lower: "abcdefghijklmnopqrstuvwxyz",
        special: "#+*~'\"/!§$%&()=?[]{}",
        num: "1234567890"
    }

    public async getInfo(projectId: string, executedUser?: string) {
        let project = await this.prismaService.project.findFirst({
            where: {
                id: projectId,
                userId: executedUser
            },
            include: {
                License: true
            }
        })

        if(!project)
            throw new NotFoundException()

        return {
            id: project.id,
            name: project.name,
            userId: project.userId,
            defaultLicenseTemplate: project.defaultLicenseTemplate,
            licenseKeyCount: project.License.length
        }

    }

    public async createKey(projectId: string, data: CreateKeyDto, executedUser?: string) {

        let project = await this.prismaService.project.findFirst({
            where: {
                id: projectId
            }
        })

        if (!project)
            throw new NotFoundException("Project not found")

        if (executedUser) {
            if (project.userId != executedUser)
                throw new ForbiddenException()
        }

        let key = this.generateKey(project.defaultLicenseTemplate);

        try {
            await this.prismaService.license.create({
                data: {
                    key: crypo.createHash("sha256").update(key).digest("base64"),
                    projectId: projectId,
                    licensedTo: data.licensedTo,
                    expires: data.expires,
                    label: data.label || undefined
                }
            })

            return {
                status: "Created",
                key: key
            }
        } catch (e) {
            console.log(e)
            key = this.generateKey(project.defaultLicenseTemplate)
            if (e["code"] == "P2002") {
                try {
                    await this.prismaService.license.create({
                        data: {
                            key: crypo.createHash("sha256").update(key).digest("base64"),
                            projectId: projectId,
                            licensedTo: data.licensedTo,
                            expires: data.expires,
                            label: data.label || null
                        }
                    })

                    return {
                        status: "Created",
                        key: key
                    }
                } catch (e) {
                    if (e["code"] == "P2002") {
                        throw new ConflictException("Cannot create any unique keys anymore. Change template")
                    }
                }
            }
        }


        throw new InternalServerErrorException()


    }

    public async getKeys(project: string, executedUser: string) {

        return this.prismaService.license.findMany({
            where: {
                projectId: project,
                project: {
                    owner: {
                        id: executedUser
                    }
                }
            },
            orderBy: {
                key: "asc"
            },
            select: {
                licensedTo: true,
                expires: true,
                projectId: true,
                lastUsedIp: true,
                lastUsed: true,
                activated: true,
                label: true,
                key: true
            }
        })
    }


    public async setKeyStatus(key: string, status: boolean, executedUser: string) {
        let keyObj = await this.prismaService.license.findFirst({
            where: {
                key: key,
                project: {
                    userId: executedUser
                }
            }
        })

        if(!keyObj)
            throw new NotFoundException("Project or key not found")


        await this.prismaService.license.update({
            where: {key: key},
            data: {
                activated: String(status) === "true"
            }
        })



        return {
            status: "Ok",
            activated: status
        }
    }
    public async verifyKey(key: string, ip: string, project?: string) {
        let hash = crypo.createHash("sha256").update(key).digest("base64");

        let dbe = await this.prismaService.license.findFirst({
            where: {
                key: hash
            }
        })



        if (!project) {
            let success = dbe != null && dbe.activated && (dbe.expires.getTime() > new Date().getTime())
            await this.prismaService.license.update({
                data: {
                    lastUsed: new Date(),
                    lastUsedIp: ip
                },
                where: {
                    key: dbe.key
                }
            })

            return {
                success: success,
                licensedTo: success ? dbe.licensedTo : null
            }
        }

        let success = dbe != null && dbe.activated && (dbe.projectId == project) && (dbe.expires.getTime() > new Date().getTime())

        await this.prismaService.license.update({
            data: {
                lastUsed: new Date(),
                lastUsedIp: ip
            },
            where: {
                key: dbe.key
            }
        })
        return {
            success: success,
            licensedTo: success ? dbe.licensedTo : null
        }
    }

    private rand(pool: string) {
        return pool[Math.floor(Math.random() * pool.length)]
    }

    private hash(key: string) {
        return  crypo.createHash("sha256").update(key).digest("base64");
    }


    private generateKey(template: string) {
        template = template.replace(/\{U}/g, () => this.rand(this.letterPools.upper))
        template = template.replace(/\{L}/g, () => this.rand(this.letterPools.lower))
        template = template.replace(/\{S}/g, () => this.rand(this.letterPools.special))
        template = template.replace(/\{N}/g, () => this.rand(this.letterPools.num))
        template = template.replace(/\{X}/g, () => this.rand(
            this.letterPools.upper +
            this.letterPools.lower +
            this.letterPools.special +
            this.letterPools.num
        ));

        return template;
    }


}
