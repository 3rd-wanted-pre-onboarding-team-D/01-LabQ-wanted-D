import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenApiConfigModule } from '../../config/open-api/config.module';

@Module({
  imports: [
    OpenApiConfigModule,
    HttpModule.register({ baseURL: 'http://openapi.seoul.go.kr:8088' }),
  ],
  exports: [OpenApiConfigModule, HttpModule],
})
export class OpenApiModule {}
