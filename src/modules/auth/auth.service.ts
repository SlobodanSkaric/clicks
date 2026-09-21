import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuthLoginDto } from './dtos/auth.login.dtos.js';
import { ApiResponseCustom } from '../../misc/api.response.js';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { GetUserDto } from './dtos/get.user.dto.js';
import * as bycript from "bcrypt"
import { Role } from '../../common/enums/role.enums.js';
import { AddDatasDto } from './dtos/add.datas.dto.js';
import { CustomException } from '../../misc/cutom.exceptions.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService
    ){}

    async addUsers(data: AddDatasDto):Promise<boolean | ApiResponseCustom>{
        const role = Role.USER;
        const salt = 10;
        let reult = false;

        const passwordHash = await bycript.hash(data.password, salt);

        const checkedData = await this.checkedUsersDatas(data);

        if(!checkedData){
            return checkedData;
        }

        try{
            reult = await this.prismaService.$transaction(async (tx) =>{
                const user = await tx.user.create({
                    data:{
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        passwordHash: passwordHash,
                        role: role
                    }
                });

                const workspace = await tx.workspace.create({
                    data:{
                        name: `${user.email} Workspace`,
                        ownerId: user.id
                    }
                });

                await tx.workspaceMember.create({
                    data:{
                        workspaceId: workspace.id,
                        userId: user.id
                    }
                })

                return true;
            })
        }catch(error){
            return new ApiResponseCustom("error", 1005, "User not add in databses");
        }

        return true;
    }

    async addAdministrator(data: AddDatasDto): Promise<boolean| ApiResponseCustom>{
        const roleUser = Role.ADMINISTRATOR;
        const salt = 10;
        let result = false

        const passwordHash = await bycript.hash(data.password, salt);

        const checkedData = await this.checkedUsersDatas(data);

        if(!checkedData){
            return checkedData;
        }

        try{
           result = await this.prismaService.$transaction(async (tx) => {
            const user = await tx.user.create({
                data:{
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    passwordHash: passwordHash,
                    role: roleUser
                }
            });

            const workspace = await tx.workspace.create({
                data: {
                    name: `${user.email} Workspace`,
                    ownerId: user.id
                }
            });

            await tx.workspaceMember.create({
                data:{
                    workspaceId: workspace.id,
                    userId: user.id,

                }
            })

            return true;
          });
         }catch(error){
            return new ApiResponseCustom("error", 1005, "User not add in databses")
         }

        
        
      return result;
    }

    async login(data: AuthLoginDto, request: Request): Promise<{} | ApiResponseCustom | any> {
        const { email, password } = data;
        const salt = 10;
        const user = await this.prismaService.user.findUnique({ where : { email: email.toLowerCase() } })

        if(!user){
            return new ApiResponseCustom("error",1010, "Invalid username");
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if(!isPasswordValid){
            return new ApiResponseCustom("error",1010, "Invalid email or password");
        }

        const ip = typeof request.headers["x-forwarded-for"] === "string" ? request.headers["x-forwarded-for"].split(",")[0].trim() : null;
        const ua = request.headers["user-agent"]?request.headers["user-agent"] : "Undefined user agent";

        const payloadForToken = {
            id: user.id,
            email: user.email,
            role: user.role,
            plan: user.plan,
            ip: ip,
            ua: ua
        }
       
        const payloadForRefreshToken = {
            id: user.id,
            email: user.email,
            role: user.role,
            plan: user.plan,
            ip: ip,
            ua: ua
        }

        const accessToken = await this.jwtService.signAsync(payloadForToken, { secret: this.configService.getOrThrow<string>("SECRET_TOKEN_KEY"), expiresIn: "15min"});
        const refreshToken = await this.jwtService.signAsync(payloadForRefreshToken, { secret: this.configService.getOrThrow<string>("SECRET_REFRESH_TOKEN_KEY"), expiresIn: "7d"});

        const userData = new GetUserDto(user.id, user.firstName, user.lastName, user.email, user.phoneNumber, user.plan);

        return { accessToken, refreshToken, userData }        
    }


    async checkedUsersDatas(data: AddDatasDto){
        const checkedEmail = await this.prismaService.user.findUnique({ where : { email: data.email } });
        const checkedPhonenumber = await this.prismaService.user.findFirst({ where: {  phoneNumber:  data.phoneNumber} });

        if(checkedEmail || checkedPhonenumber){
            const apiRes = new ApiResponseCustom("error", 1004, "User with this email or phonenumber existin")
            throw new CustomException(apiRes, HttpStatus.BAD_REQUEST)
        }

        return true;
    }

}