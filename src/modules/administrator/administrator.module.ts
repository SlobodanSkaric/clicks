import { Module } from '@nestjs/common';
import { AdministratorController } from './administrator.controller.js';
import { AdministratorService } from './administrator.service.js';
import { RoleGuard } from '../../common/guards/roles.guards.js';
import { AuthModule } from '../auth/auth.module.js';
@Module({
  controllers: [AdministratorController],
  providers: [AdministratorService, RoleGuard],
  imports:[AuthModule]
})
export class AdministratorModule {}
