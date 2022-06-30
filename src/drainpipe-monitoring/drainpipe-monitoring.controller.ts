import { Body, Controller, Get } from '@nestjs/common';
import { DrainpipeMonitoringService } from './drainpipe-monitoring.service';
import { RequestDrainpipeInfoDto } from './dto/request.drainpipe-info.dto';
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
      reqDrainDto.GUBN,
      reqDrainDto.MEA_YMD,
      reqDrainDto.MEA_YMD2,
    );
  }
}
