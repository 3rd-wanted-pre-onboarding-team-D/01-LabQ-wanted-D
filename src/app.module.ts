import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenApiConfigModule } from './config/open-api/config.module';
import { DrainpipeMonitoringModule } from './drainpipe-monitoring/drainpipe-monitoring.module';
import { RainfallModule } from './rainfall/rainfall.module';
import { AnomalyDetectionModule } from './anomaly-detection/anomaly-detection.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OpenApiConfigModule,
    DrainpipeMonitoringModule,
    RainfallModule,
    AnomalyDetectionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
