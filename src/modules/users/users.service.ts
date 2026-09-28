import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { ApiResponseCustom } from '../../misc/api.response.js';
import { Role } from '../../../generated/prisma/enums.js';
import { ResponseUsersoDto } from './dtos/get.user.datas.js';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name)

    constructor(private readonly prisma: PrismaService){}

    async getAllUsers():Promise<ResponseUsersoDto[]>{
        //implements paginations
        try{
            const users = await this.prisma.user.findMany(
                { where: { role: Role.USER },
                select:{
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phoneNumber: true,
                    role: true,
                    plan: true
                }
            });
    
            if(users.length === 0){
                throw new NotFoundException("Users not exsisting in database");
            }
    
            return users.map(data => new ResponseUsersoDto(data.id, data.firstName, data.lastName,data.email,data.phoneNumber,data.role,data.plan))
        }catch(error: any){
            if( error instanceof NotFoundException) throw error;

            this.logger.error(`Failed to fetch users: ${error.message}`, error.stack)
            throw new InternalServerErrorException("An unexpected error occurred while fetching users")
        }
    }



    async getUserById(idUser: string):Promise<ResponseUsersoDto>{
        try{
            const user = await this.prisma.user.findFirst(
                { where: { id: idUser},
                    select:{
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                        role: true,
                        plan: true
                    }
            });
            
            if(!user){
                throw new NotFoundException("User is not found");
            }
    
            return  new ResponseUsersoDto(user.id,user.firstName,user.lastName,user.email,user.phoneNumber,user.role,user.plan);
        }catch(error: any){
            if(error instanceof NotFoundException) throw error;

            this.logger.error(`Failed to fetch users: ${error.message}`, error.stack);
            throw new InternalServerErrorException("An unexpected error occurred while fetching users");
        }        
    }

    async editUser(){}
    async deleteUser(){}
}
