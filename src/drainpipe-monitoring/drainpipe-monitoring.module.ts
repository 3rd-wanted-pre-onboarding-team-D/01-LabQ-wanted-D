import { Module } from '@nestjs/common';
import { OpenApiModule } from '../common/open-api/openApi.module';
import { DrainpipeMonitoringController } from './drainpipe-monitoring.controller';
import { DrainpipeMonitoringService } from './drainpipe-monitoring.service';

@Module({
  imports: [OpenApiModule],
  controllers: [DrainpipeMonitoringController],
  providers: [DrainpipeMonitoringService],
  exports: [DrainpipeMonitoringService],
})
export class DrainpipeMonitoringModule {}
