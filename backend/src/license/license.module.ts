import { Module } from '@nestjs/common';
import { LicenseController } from './license.controller';
import { LicenseService } from './license.service';
import {PrismaService} from "../_services/prisma/prisma.service";

@Module({
  exports: [LicenseService],
  controllers: [LicenseController],
  providers: [LicenseService, PrismaService]
})
export class LicenseModule {}
