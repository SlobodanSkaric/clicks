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
    async getAllAdministrators(): Promise<any | null>{
        return await this.administratorService.getAllAdministrators();
    }

    @Get("admin")
    async getAdministratorById(@Req() req: Request): Promise<any | null>{
        
    }

   

    @Post("edit")
    async editAdministrator(@Body() data: any, @Req() req: Request): Promise<any | null>{

    }

    @Post("delete")
    async deleteAdministrator(@Req() req: Request): Promise<any | null>{}
}
