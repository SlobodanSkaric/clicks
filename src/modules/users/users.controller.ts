import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service.js';
import { AddDatasDto } from '../auth/dtos/add.datas.dto.js';
import { ApiResponseCustom } from '../../misc/api.response.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enums.js';
import { Roles } from '../../common/decorators/role.decorator.js';
import { JwtAuthGuard } from '../auth/jwt.auth.gurad.js';
import { RoleGuard } from '../../common/guards/roles.guards.js';
import { GetUserDto } from '../auth/dtos/get.user.dto.js';
import { UsersService } from './users.service.js';
import { CustomException } from '../../misc/cutom.exceptions.js';
import { Http2ServerRequest } from 'http2';
import { ResponseUsersoDto } from './dtos/get.user.datas.js';
import { RequestDecoratorForuser } from '../../common/decorators/request.decorator.js';

@Controller('users')
@ApiTags("Users")
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get("all")
    @Roles(Role.ADMINISTRATOR)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @ApiOperation({ summary: "Get All User" })
    @ApiResponse({ status: 200, type: [ResponseUsersoDto], description: "Listi all users" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 403, description: "Forbidden - Admin only" })
    async getAllUsers(): Promise<ResponseUsersoDto[] >{
        const users = await this.userService.getAllUsers();
        return users;
    }

    @Get("user")
    @Roles(Role.USER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiOperation({ summary: "Get user by Id" })
    @ApiOperation({ summary: "Get All User" })
    @ApiResponse({ status: 200, type: [ResponseUsersoDto], description: "Listi all users" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 403, description: "Forbidden - User only" })
    async getUserById(@RequestDecoratorForuser() userReq: any): Promise<ResponseUsersoDto>{
        const user = await this.userService.getUserById(userReq.id);

        return user;
    }

    async editUser(){}
    async deleteUser(){}    
}
