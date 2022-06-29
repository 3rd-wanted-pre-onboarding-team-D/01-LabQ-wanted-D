import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenApiConfigService } from './config.service';

@Module({
  providers: [ConfigService, OpenApiConfigService],
  exports: [ConfigService, OpenApiConfigService],
})
export class OpenApiConfigModule {}
