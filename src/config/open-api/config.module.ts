import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenApiConfigService } from './config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigService, OpenApiConfigService],
  exports: [ConfigService, OpenApiConfigService],
})
export class OpenApiConfigModule {}
