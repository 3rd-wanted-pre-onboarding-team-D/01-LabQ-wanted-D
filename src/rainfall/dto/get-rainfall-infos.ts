import { RainfallInfo } from './rainfall-info.dto';
import { RainfallInfosOpenAPI } from './rainfall-infos-openapi';

export class GetRainfallInfos {
  list_total_count: number;

  data: RainfallInfo[];

  static of(totalCount: number, rainfallInfosOpenAPIs: RainfallInfosOpenAPI[]) {
    const getRainfallInfos = new GetRainfallInfos();
    getRainfallInfos.list_total_count = totalCount;
    getRainfallInfos.data = rainfallInfosOpenAPIs.reduce<RainfallInfo[]>(
      (prev, cur) => {
        return [...prev, ...cur.ListRainfallService.row];
      },
      [],
    );

    return getRainfallInfos;
  }
}
