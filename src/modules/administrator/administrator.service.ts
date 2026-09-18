import { PrismaService } from '../../prisma/prisma.service.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdministratorService {
    constructor(private prisma: PrismaService){}

    
}
