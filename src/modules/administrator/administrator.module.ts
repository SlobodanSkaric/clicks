import { Module } from '@nestjs/common';
import { AdministratorController } from './administrator.controller.js';
import { AdministratorService } from './administrator.service.js';
@Module({
  controllers: [AdministratorController],
  providers: [AdministratorService]
})
export class AdministratorModule {}
