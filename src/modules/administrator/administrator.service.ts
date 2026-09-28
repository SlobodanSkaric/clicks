import { PrismaService } from '../../prisma/prisma.service.js';
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { ResponseAdministratoDto } from './dtos/response.administrator.dto.js';
import * as bycript from "bcrypt"
import { ApiResponseCustom } from '../../misc/api.response.js';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class AdministratorService {
    private readonly logger = new Logger(AdministratorService.name);
    constructor(private prisma: PrismaService){}

    async getAllAdministrators():Promise<ResponseAdministratoDto[] >{
        try{
            const getAdministrators = await this.prisma.user.findMany({ 
                where : { role: "ADMINISTRATOR" }, 
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true,
                    plan: true,
                    role: true  
                }    
            });
    
            if(!getAdministrators){
                throw new NotFoundException("Administrators not existes")
             }
    
             return getAdministrators.map((data) => new ResponseAdministratoDto(data.id, data.firstName, data.lastName, data.email, data.phoneNumber, data.role, data.plan));
        }catch(error: any){
            if(error instanceof NotFoundException) throw error

            throw new InternalServerErrorException("An unexpected error occurred while fetching admnistrators")
            this.logger.error(`Faild the fatch administrators ${error.message}`, error.stack)
        }
       
    }

    async getAdminstratorById(idAdmin: string):Promise<ResponseAdministratoDto>{
        try{
            const getAdministrator = await this.prisma.user.findFirst({ 
                where: { id: idAdmin},
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true,
                    plan: true,
                    role: true  
                }
            });

            if(!getAdministrator){
                throw new NotFoundException(`Not found administrator by id ${idAdmin}`)
            }

            return new ResponseAdministratoDto(getAdministrator.id, getAdministrator.firstName, getAdministrator.lastName, getAdministrator.email, getAdministrator.phoneNumber,getAdministrator.role, getAdministrator.plan);
        }catch(error: any){
            if(error instanceof NotFoundException) throw error;

            throw new InternalServerErrorException(`An unexpected error occurred while fetching admnistrator`);
            this.logger.log(`Faild the fatch administrator ${error.message}`, error.stack)
        }

    }

    
}
