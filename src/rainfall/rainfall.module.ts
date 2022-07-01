import { Module } from '@nestjs/common';
import { OpenApiModule } from '../common/open-api/openApi.module';
import { RainfallController } from './rainfall.controller';
import { RainfallService } from './rainfall.service';

@Module({
  imports: [OpenApiModule],
  controllers: [RainfallController],
  providers: [RainfallService],
  exports: [RainfallService],
})
export class RainfallModule {}
