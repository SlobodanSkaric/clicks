import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.access_cookies 
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('SECRET_TOKEN_KEY'),
        })
    }

    async validate(payload: any){
        return {
            id: payload.id,
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
            phoneNumber: payload.phoneNumber,
            role: payload.role,
            plan: payload.plan,
            createdAt: payload.createdAt,
            updatedAt: payload.updatedAt,
        }
    }
}