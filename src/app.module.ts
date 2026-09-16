import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module.js';
import { UserModule } from './modules/users/user.module.js';
import { AdministratorModule } from './modules/administrator/administrator.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    PrismaModule,
    AuthModule,
    UserModule,
    AdministratorModule
  ],
  providers: [],
})
export class AppModule {}
