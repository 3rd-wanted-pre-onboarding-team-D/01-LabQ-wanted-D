import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class DrainpipeMonitoringService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // : Promise<AxiosResponse<getDrainpipeInfoDto[]>>
  async getApi(): Promise<any> {
    const key = this.configService.get<string>('OPEN_API_KEY');

    const url = `http://openapi.seoul.go.kr:8088/${key}/json/DrainpipeMonitoringInfo/1/5/01/2022030214/2022030315`;

    try {
      const data = await firstValueFrom(
        this.httpService.get(url).pipe(map((response) => response.data)),
      );
      console.log(data.DrainpipeMonitoringInfo.row);
      return data;
    } catch (e) {
      return NotFoundException;
    }
  }
}
