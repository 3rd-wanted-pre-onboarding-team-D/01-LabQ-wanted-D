import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenApiConfigModule } from 'src/config/open-api/config.module';
import { RainfallController } from './rainfall.controller';
import { RainfallService } from './rainfall.service';

@Module({
  imports: [
    OpenApiConfigModule,
    HttpModule.register({ baseURL: 'http://openAPI.seoul.go.kr:8088' }),
  ],
  controllers: [RainfallController],
  providers: [RainfallService],
  exports: [RainfallService],
})
export class RainfallModule {}
