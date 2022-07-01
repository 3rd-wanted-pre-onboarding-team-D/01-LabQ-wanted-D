import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, lastValueFrom } from 'rxjs';
import { OpenApiConfigService } from '../config/open-api/config.service';
import { GetRainfallInfos } from './dto/get-rainfall-infos.dto';
import { RainfallInfosOpenAPI } from './dto/rainfall-infos-openapi.dto';

@Injectable()
export class RainfallService {
  constructor(
    private readonly opanApiConfigService: OpenApiConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getRainfallInfos(guName: string) {
    const totalCount = await this.getTotalCount(guName);

    const results = await this.getRainfallInfosOpenAPI(totalCount, guName);

    const getRainfallInfos = GetRainfallInfos.of(totalCount, results);

    return getRainfallInfos;
  }

  private async getTotalCount(guName: string) {
    const response = await this.get(1, 1, guName);

    return response.ListRainfallService.list_total_count;
  }

  private getRainfallInfosOpenAPI(
    totalCount: number,
    guName: string,
  ): Promise<RainfallInfosOpenAPI[]> {
    const requests: Promise<RainfallInfosOpenAPI>[] = [];

    const requestCount = Math.floor(totalCount / 1000);

    for (let i = 0; i < requestCount; i++) {
      requests.push(this.get(i * 1000 + 1, (i + 1) * 1000, guName));
    }

    if (totalCount > requestCount * 1000) {
      requests.push(this.get(requestCount * 1000 + 1, totalCount, guName));
    }

    return Promise.all(requests);
  }

  private async get(start: number, end: number, guName: string) {
    const response = this.httpService.get<RainfallInfosOpenAPI>(
      encodeURI(
        `/${this.opanApiConfigService.apiKey}/json/ListRainfallService/${start}/${end}/${guName}`,
      ),
    );

    const result = await lastValueFrom(response.pipe(map((res) => res.data)));

    return result;
  }
}
