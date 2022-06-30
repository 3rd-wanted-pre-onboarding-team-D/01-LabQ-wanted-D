import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { ResponseDrainpipeInfoDto } from './response.drainpipe-info.dto';

@Injectable()
export class DrainpipeMonitoringService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // : Promise<AxiosResponse<getDrainpipeInfoDto[]>>
  async getDrainpipeApi(reqGubn, reqYmd, reqYmd2): Promise<ResponseDrainpipeInfoDto[]> {
    const key = this.configService.get<string>('OPEN_API_KEY');

    const testUrl = `http://openapi.seoul.go.kr:8088/${key}/json/DrainpipeMonitoringInfo/1/5/01/2022030214/2022030315`;
    const url = `http://openapi.seoul.go.kr:8088/${key}/json/DrainpipeMonitoringInfo/1/5/${reqGubn}/${reqYmd}/${reqYmd2}`;

    try {
      const responseData = await firstValueFrom(
        this.httpService.get(url).pipe(map((response) => response.data)),
      );

      //responseData
      // {
      //   DrainpipeMonitoringInfo: {
      //     list_total_count: 6240,
      //     RESULT: { CODE: 'INFO-000', MESSAGE: '정상 처리되었습니다' },
      //     row: [ [Object], [Object], [Object], [Object], [Object] ] //row안에 있는 값에 접근해야함
      //   }
      // }

      const rowData = responseData.DrainpipeMonitoringInfo.row;

      const drainpipeDto = new ResponseDrainpipeInfoDto();

      const responseArr = [];

      for (const idx in rowData) {
        drainpipeDto.idn = rowData[idx].IDN;
        drainpipeDto.gubn = rowData[idx].GUBN;
        drainpipeDto.gubn_nam = rowData[idx].GUBN_NAM;
        drainpipeDto.mea_ymd = rowData[idx].MEA_YMD;
        drainpipeDto.mea_wal = rowData[idx].MEA_WAL;
        drainpipeDto.sig_sta = rowData[idx].SIG_STA;

        responseArr.push(drainpipeDto);
      }

      return responseArr;
    } catch (e) {
      NotFoundException;
    }
  }
}
