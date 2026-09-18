import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import  Request  from 'express';
import { AdministratorService } from './administrator.service.js';


@Controller('administrator')
export class AdministratorController {   
    constructor(private readonly administratorService: AdministratorService){}
    
    @Get("all")
    async getAllAdministrators(): Promise<any | null>{

    }

    @Get("admin")
    async getAdministratorById(@Req() req: Request): Promise<any | null>{
        
    }

    @Post("add")
    async addAdminstrator(@Body() data: any): Promise<any | null>{

    }

    @Post("edit")
    async editAdministrator(@Body() data: any, @Req() req: Request): Promise<any | null>{

    }

    @Post("delete")
    async deleteAdministrator(@Req() req: Request): Promise<any | null>{}
}
