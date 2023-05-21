import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import {PrismaService} from "../_services/prisma/prisma.service";
import {LicenseModule} from "../license/license.module";

@Module({
  imports: [LicenseModule],
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService],
  exports: [ProjectService]
})
export class ProjectModule {}
