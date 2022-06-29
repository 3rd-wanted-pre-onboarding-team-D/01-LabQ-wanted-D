import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, lastValueFrom } from 'rxjs';
import { OpenApiConfigService } from '../config/open-api/config.service';
import { RainFallInfosOpenAPI } from './dto/rainfall-infos-openapi';

@Injectable()
export class RainfallService {
  constructor(
    private readonly opanApiConfigService: OpenApiConfigService,
    private readonly httpService: HttpService,
  ) {}

  private async getTotalCount(guName: string) {
    const response = this.httpService.get<RainFallInfosOpenAPI>(
      encodeURI(
        `/${this.opanApiConfigService.apiKey}/json/ListRainfallService/1/1/${guName}`,
      ),
    );

    const result = await lastValueFrom(response.pipe(map((res) => res.data)));

    return result.ListRainfallService.list_total_count;
  }
}
