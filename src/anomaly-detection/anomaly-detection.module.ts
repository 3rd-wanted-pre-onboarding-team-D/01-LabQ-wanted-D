import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenApiConfigModule } from 'src/config/open-api/config.module';
import { DrainpipeMonitoringModule } from 'src/drainpipe-monitoring/drainpipe-monitoring.module';
import { DrainpipeMonitoringService } from 'src/drainpipe-monitoring/drainpipe-monitoring.service';
import { RainfallModule } from 'src/rainfall/rainfall.module';
import { RainfallService } from 'src/rainfall/rainfall.service';
import { AnomalyDetectionController } from './anomaly-detection.controller';
import { AnomalyDetectionService } from './anomaly-detection.service';

@Module({
  imports: [
    HttpModule,
    OpenApiConfigModule,
    DrainpipeMonitoringModule,
    RainfallModule,
  ],
  controllers: [AnomalyDetectionController],
  providers: [
    AnomalyDetectionService, 
    DrainpipeMonitoringService,
    RainfallService,
  ]
})
export class AnomalyDetectionModule {}
