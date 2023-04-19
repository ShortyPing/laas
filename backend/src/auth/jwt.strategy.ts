import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import config from "../config";
import {PrismaService} from "../_services/prisma/prisma.service";
import {Inject} from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config().jwtSecret
        });
    }

    async validate(payload: any) {


        return this.prismaService.user.findFirst({
            where: {
                id: payload["id"]
            }
        });
    }
}