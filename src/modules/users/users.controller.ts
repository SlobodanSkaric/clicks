import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service.js';
import { AddDatasDto } from '../auth/dtos/add.datas.dto.js';
import { ApiResponseCustom } from '../../misc/api.response.js';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enums.js';
import { Roles } from '../../common/decorators/role.decorator.js';
import { JwtAuthGuard } from '../auth/jwt.auth.gurad.js';
import { RoleGuard } from '../../common/guards/roles.guards.js';
import { GetUserDto } from '../auth/dtos/get.user.dto.js';

@Controller('users')
@ApiTags("Users")
export class UsersController {
    constructor(private readonly authService: AuthService){}

    @Get("all")
    @Roles(Role.ADMINISTRATOR)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @ApiOperation({ summary: "Get All User" })
    async getAllUsers(): Promise<GetUserDto[] | ApiResponseCustom | void>{

    }

    
}
