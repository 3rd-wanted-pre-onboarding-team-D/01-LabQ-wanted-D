import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenApiConfigModule } from './config/open-api/config.module';
import { DrainpipeMonitoringModule } from './drainpipe-monitoring/drainpipe-monitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OpenApiConfigModule,
    DrainpipeMonitoringModule,
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
