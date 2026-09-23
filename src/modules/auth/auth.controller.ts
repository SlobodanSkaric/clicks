import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthLoginDto } from './dtos/auth.login.dtos.js';
import { ApiResponseCustom } from '../../misc/api.response.js';
import type { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomException } from '../../misc/cutom.exceptions.js';
import { Http2ServerRequest } from 'http2';
import { AddDatasDto } from './dtos/add.datas.dto.js';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("add/user")
    @ApiOperation({ summary: "Add Users" })
    @ApiResponse({ status: 200, description: "User add success" })
    @ApiResponse({ status: 500,  description: "Internal server error" })
    async addUser(@Body() data: AddDatasDto):Promise<boolean | ApiResponseCustom>{
        const result = await this.authService.addUsers(data);
        if(result instanceof ApiResponseCustom){
            throw new CustomException(result, HttpStatus.BAD_REQUEST);
        }

        return true;
    }

    @Post("add/administrator")
    @ApiOperation({summary: "Add Adminstrator"})
    @ApiResponse({status:201, description:"Add administrator is success"})
    @ApiResponse({ status: 500,  description: "Internal server error" })
    async addAdminstrator(@Body() data: AddDatasDto): Promise<boolean | ApiResponseCustom>{
        const result = await this.authService.addAdministrator(data);
        if(result instanceof ApiResponseCustom){
            throw new CustomException(result, HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    @Post("login")
    @ApiOperation({ summary: "Login" })
    @ApiResponse({status:201, description:"Add administrator is success"})
    @ApiResponse({ status: 500,  description: "Internal server error" })
    async userLogin(@Body()data: AuthLoginDto, @Req()request: Request, @Res({ passthrough: true }) res: Response): Promise<{ } | ApiResponseCustom> {
        const result = await this.authService.login(data, request);

        if(result instanceof ApiResponseCustom){
           throw new CustomException(result, HttpStatus.BAD_REQUEST)
        }

        res.cookie("access_cookies", result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 15
        });

        res.cookie("refresh_cookies", result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        return { messages: "User success login", userData: result.userData }
    }

    @Get("logout")
    @ApiOperation({ summary: "Logout" })
    @ApiResponse({ status: 200, description: "Logout success" })
    async logout(@Res({ passthrough:true }) res: Response):Promise<{messges: string}>{
        res.clearCookie("access_cookies");
        res.clearCookie("refresh_cookies");
        
        return {messges: "Loguout"}
    }

}
