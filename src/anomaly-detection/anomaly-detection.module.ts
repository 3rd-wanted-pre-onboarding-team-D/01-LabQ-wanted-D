import { Module } from '@nestjs/common';
import { DrainpipeMonitoringModule } from '../drainpipe-monitoring/drainpipe-monitoring.module';
import { RainfallModule } from '../rainfall/rainfall.module';
import { AnomalyDetectionController } from './anomaly-detection.controller';
import { AnomalyDetectionService } from './anomaly-detection.service';

@Module({
  imports: [RainfallModule, DrainpipeMonitoringModule],
  controllers: [AnomalyDetectionController],
  providers: [AnomalyDetectionService],
})
export class AnomalyDetectionModule {}
