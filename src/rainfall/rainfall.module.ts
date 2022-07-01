import { Module } from '@nestjs/common';
import { OpenApiModule } from '../common/open-api/open-api.module';
import { RainfallService } from './rainfall.service';

@Module({
  imports: [OpenApiModule],
  providers: [RainfallService],
  exports: [RainfallService],
})
export class RainfallModule {}
