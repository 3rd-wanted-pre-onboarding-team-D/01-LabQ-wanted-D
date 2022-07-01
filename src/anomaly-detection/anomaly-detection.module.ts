import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenApiConfigModule } from 'src/config/open-api/config.module';
import { DrainpipeMonitoringService } from 'src/drainpipe-monitoring/drainpipe-monitoring.service';
import { RainfallService } from 'src/rainfall/rainfall.service';
import { AnomalyDetectionController } from './anomaly-detection.controller';
import { AnomalyDetectionService } from './anomaly-detection.service';

@Module({
  imports: [
    HttpModule.register({ baseURL: 'http://openAPI.seoul.go.kr:8088' }),
    OpenApiConfigModule,
  ],
  controllers: [AnomalyDetectionController],
  providers: [
    AnomalyDetectionService, 
    DrainpipeMonitoringService,
    RainfallService,
  ]
})
export class AnomalyDetectionModule {}
