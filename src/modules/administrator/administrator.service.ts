import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service.js';

@Injectable()
export class AdministratorService {
    constructor(private prisma: PrismaService){}

    
}
