import { Controller, Get } from '@nestjs/common';
import { DrainpipeMonitoringService } from './drainpipe-monitoring.service';

@Controller('drainpipe-monitoring')
export class DrainpipeMonitoringController {
  constructor(
    private readonly drainpipeMonitoringService: DrainpipeMonitoringService,
  ) {}

  @Get()
  getDrainInfo() {
    const data = this.drainpipeMonitoringService.getApi();
    // const response = JSON.parse(JSON.stringify(data));
  }
}
