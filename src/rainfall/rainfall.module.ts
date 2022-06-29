import { Module } from '@nestjs/common';
import { RainfallService } from './rainfall.service';

@Module({
  providers: [RainfallService]
})
export class RainfallModule {}
