import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import  Request, { response }  from 'express';
import { AdministratorService } from './administrator.service.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseCustom } from '../../misc/api.response.js';
import { CustomException } from '../../misc/cutom.exceptions.js';
import { JwtAuthGuard } from '../auth/jwt.auth.gurad.js';
import { RoleGuard } from '../../common/guards/roles.guards.js';
import { Roles } from '../../common/decorators/role.decorator.js';
import { Role } from '../../common/enums/role.enums.js';
import { AuthService } from '../auth/auth.service.js';
import { AddDatasDto } from '../auth/dtos/add.datas.dto.js';
import { ResponseAdministratoDto } from './dtos/response.administrator.dto.js';
import { RequestDecoratorForuser } from '../../common/decorators/request.decorator.js';

@ApiTags("Administrators")
@Controller('administrator')
export class AdministratorController {   
    constructor(
        private readonly administratorService: AdministratorService,
        private readonly authService: AuthService
    ){}
    
    @Get("all")
    @Roles(Role.ADMINISTRATOR)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @ApiOperation({ summary: "Get All Administrators"})
    @ApiResponse({ status: 200, type:[ResponseAdministratoDto], description:"Get all Administrators" })
    @ApiResponse({ status: 401, description:"Unauthorized" })
    @ApiResponse({ status: 403, description:"Forbidden - User only" })
    async getAllAdministrators(): Promise<ResponseAdministratoDto[]>{
        return await this.administratorService.getAllAdministrators();
    }

    @Get("admin")
    @Roles(Role.ADMINISTRATOR)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiOperation({ summary: "Get Adminstrator by Id" })
    @ApiResponse({ status: 200, type:[ResponseAdministratoDto]})
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 403, description: "Forbidden - User only" })
    async getAdministratorById(@RequestDecoratorForuser() data: any): Promise<ResponseAdministratoDto>{
        return await this.administratorService.getAdminstratorById(data.id)
    }

   

    @Post("edit")
    async editAdministrator(@Body() data: any, @Req() req: Request): Promise<any | null>{

    }

    @Post("delete")
    async deleteAdministrator(@Req() req: Request): Promise<any | null>{}
}
