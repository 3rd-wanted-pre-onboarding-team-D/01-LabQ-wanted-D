import { ResponseDrainpipeInfoDto } from '../response.drainpipe-info.dto';

export class DrainpipeInfoOpenApiDto {
  DrainpipeMonitoringInfo: {
    list_total_count: number;

    RESULT: {
      CODE: string;
      MESSAGE: string;
    };

    row: ResponseDrainpipeInfoDto[];
  };
}
