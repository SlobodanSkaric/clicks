import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import  Request, { response }  from 'express';
import { AdministratorService } from './administrator.service.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddAdministratorsDto } from './dtos/add.administrators.dto.js';
import { ApiResponseCustom } from '../../misc/api.response.js';
import { CustomException } from '../../misc/cutom.exceptions.js';

@ApiTags("Administrators")
@Controller('administrator')
export class AdministratorController {   
    constructor(private readonly administratorService: AdministratorService){}
    
    @Get("all")
    @ApiOperation({ summary: "Get All Administrators"})
    async getAllAdministrators(): Promise<any | null>{
        return await this.administratorService.getAllAdministrators();
    }

    @Get("admin")
    async getAdministratorById(@Req() req: Request): Promise<any | null>{
        
    }

    @Post("add")
    @ApiOperation({summary: "Add Adminstrator"})
    @ApiResponse({status:201, description:"Add administrator is success"})
    async addAdminstrator(@Body() data: AddAdministratorsDto): Promise<boolean | ApiResponseCustom>{
        const result = await this.administratorService.addAdministrator(data);

        if(result instanceof ApiResponseCustom){
            throw new CustomException(result, HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    @Post("edit")
    async editAdministrator(@Body() data: any, @Req() req: Request): Promise<any | null>{

    }

    @Post("delete")
    async deleteAdministrator(@Req() req: Request): Promise<any | null>{}
}
