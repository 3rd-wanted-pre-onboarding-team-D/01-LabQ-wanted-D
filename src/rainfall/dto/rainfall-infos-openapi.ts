import { RainFallInfo } from './rainfall-info.dto';

export class RainFallInfosOpenAPI {
  ListRainfallService: {
    list_total_count: number;

    RESULT: {
      CODE: string;
      MESSAGE: string;
    };

    row: [RainFallInfo];
  };
}
