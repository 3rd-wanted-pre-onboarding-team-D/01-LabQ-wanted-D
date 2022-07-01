import { Module } from '@nestjs/common';
import { OpenApiModule } from '../common/open-api/open-api.module';
import { DrainpipeMonitoringService } from './drainpipe-monitoring.service';

@Module({
  imports: [OpenApiModule],
  providers: [DrainpipeMonitoringService],
  exports: [DrainpipeMonitoringService],
})
export class DrainpipeMonitoringModule {}
