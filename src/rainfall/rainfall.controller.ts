import { Controller, Get, Query } from '@nestjs/common';
import { RainfallService } from './rainfall.service';

@Controller('/rainfall')
export class RainfallController {
  constructor(private readonly rainfallService: RainfallService) {}

  @Get()
  getRainfallInfos(@Query('guName') guName: string) {
    return this.rainfallService.getRainfallInfos(guName);
  }
}
