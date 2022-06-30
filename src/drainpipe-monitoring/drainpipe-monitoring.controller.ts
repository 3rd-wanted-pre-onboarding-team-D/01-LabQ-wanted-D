import { Body, Controller, Get } from '@nestjs/common';
import { DrainpipeMonitoringService } from './drainpipe-monitoring.service';
import { RequestDrainpipeInfoDto } from './request.drainpipe-info.dto';
import { ResponseDrainpipeInfoDto } from './response.drainpipe-info.dto';

@Controller('drainpipe-monitoring')
export class DrainpipeMonitoringController {
  constructor(
    private readonly drainpipeMonitoringService: DrainpipeMonitoringService,
  ) {}

  @Get()
  getDrainInfo(
    @Body() reqDrainDto: RequestDrainpipeInfoDto,
  ): Promise<ResponseDrainpipeInfoDto[]> {
    return this.drainpipeMonitoringService.getDrainpipeApi(
      reqDrainDto.gubn,
      reqDrainDto.mea_ymd,
      reqDrainDto.mea_ymd2,
    );
  }
}
