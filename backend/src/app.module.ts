import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './_services/prisma/prisma.service';
import {ConfigModule} from "@nestjs/config";
import { ProjectModule } from './project/project.module';
import { LicenseModule } from './license/license.module';
import config from "./config";

@Module({
  imports: [UserModule, ConfigModule.forRoot({
    load: [config]
  }), ProjectModule, LicenseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
