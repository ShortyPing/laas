import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {PrismaService} from "../_services/prisma/prisma.service";
import {JwtModule} from "@nestjs/jwt";
import config from "../config";
import {JwtStrategy} from "../auth/jwt.strategy";
import { SelfController } from './self/self.controller';
import {ProjectModule} from "../project/project.module";

@Module({
  imports: [
      JwtModule.register({
        secret: config().jwtSecret,
        signOptions: {
          expiresIn: "7d"
        }
      }),
      ProjectModule
  ],
  controllers: [UserController, SelfController],
  providers: [UserService, PrismaService, JwtStrategy],
  exports: [
      JwtModule,
      UserService
  ]
})
export class UserModule {}
