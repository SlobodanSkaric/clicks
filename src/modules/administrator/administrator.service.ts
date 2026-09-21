import { PrismaService } from '../../prisma/prisma.service.js';
import { Injectable } from '@nestjs/common';
import { ResponseAdministratoDto } from './dtos/response.administrator.dto.js';
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

    
}
