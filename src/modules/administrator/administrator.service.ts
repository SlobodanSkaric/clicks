import { PrismaService } from '../../prisma/prisma.service.js';
import { Injectable } from '@nestjs/common';
import { ResponseAdministratoDto } from './dtos/response.administrator.dto.js';
import { AddAdministratorsDto } from './dtos/add.administrators.dto.js';
import * as bycript from "bcrypt"
import { ApiResponseCustom } from '../../misc/api.response.js';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class AdministratorService {
    constructor(private prisma: PrismaService){}

    async getAllAdministrators():Promise<ResponseAdministratoDto[] | ApiResponseCustom | void>{
        let administrators: ResponseAdministratoDto[] = [] as ResponseAdministratoDto[];
        const getAdministrators = await this.prisma.user.findMany({ where : { role: "ADMINISTRATOR" } });

        if(!getAdministrators){
            return new ApiResponseCustom("error", 1006, "Table is empty");
         }

         getAdministrators.forEach((data) => {
             administrators.push(new ResponseAdministratoDto(data.id, data.firstName, data.lastName, data.email, data.phoneNumber, data.role, data.plan))
         });

         return administrators;
    }

    async addAdministrator(data: AddAdministratorsDto): Promise<boolean| ApiResponseCustom>{
        const roleUser = "ADMINISTRATOR"; //Set role in .env
        const salt = 10;
        let result = false

        const passwordHash = await bycript.hash(data.password, salt);

        const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
        const checkodPhoneNubmer = await this.prisma.user.findFirst({ where : { phoneNumber: data.phoneNumber } });

        
        if(existingUser || checkodPhoneNubmer){
            return new ApiResponseCustom("error", 1004, "User with this email or phonenumber existin")
        }

        try{
           result = await this.prisma.$transaction(async (tx) => {
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
}
