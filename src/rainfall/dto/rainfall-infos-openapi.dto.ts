import { RainfallInfo } from './rainfall-info.dto';

export class RainfallInfosOpenAPI {
  ListRainfallService: {
    list_total_count: number;

    RESULT: {
      CODE: string;
      MESSAGE: string;
    };

    row: RainfallInfo[];
  };
}
