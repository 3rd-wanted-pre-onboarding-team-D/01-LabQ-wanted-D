import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DrainpipeMonitoringController } from './drainpipe-monitoring.controller';
import { DrainpipeMonitoringService } from './drainpipe-monitoring.service';

@Module({
  imports: [HttpModule],
  controllers: [DrainpipeMonitoringController],
  providers: [DrainpipeMonitoringService],
  exports: [DrainpipeMonitoringService],
})
export class DrainpipeMonitoringModule {}
