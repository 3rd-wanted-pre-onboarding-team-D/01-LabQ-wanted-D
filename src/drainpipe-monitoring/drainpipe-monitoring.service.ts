import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { ResponseDrainpipeInfoDto } from './dto/response.drainpipe-info.dto';
import { DrainpipeInfoOpenApiDto } from './dto/drainpipe-info-openapi.dto';
import { OpenApiConfigService } from '../config/open-api/config.service';

@Injectable()
export class DrainpipeMonitoringService {
  constructor(
    private readonly httpService: HttpService,
    private readonly openApiConfigService: OpenApiConfigService,
  ) {}

  async getDrainpipeApi(
    reqGubn,
    reqYmd,
    reqYmd2,
  ): Promise<ResponseDrainpipeInfoDto[]> {
    //데이터 총 개수
    const totalDataCount = await this.getApiData(
      'count',
      1,
      1,
      reqGubn,
      reqYmd,
      reqYmd2,
    );
    //리턴할 새 배열 생성
    const responseArr = [];

    //최대 1000건 요청을 위해 데이터 자르기
    const repeat = totalDataCount / 1000;

    //1000개 단위 데이터 요청
    for (let i = 0; i <= repeat; i++) {
      const getData = await this.rowData(
        i * 1000 + 1,
        (i + 1) * 1000,
        reqGubn,
        reqYmd,
        reqYmd2,
      );

      for (const idx in getData) {
        responseArr.push(getData[idx]);
      }
    }

    //1000개 단위로 나눈 나머지 요청
    if (totalDataCount > repeat * 1000) {
      const getData = await this.rowData(
        repeat * 1000 + 1,
        totalDataCount,
        reqGubn,
        reqYmd,
        reqYmd2,
      );

      for (const idx in getData) {
        responseArr.push(getData[idx]);
      }
    }
    return responseArr;
  }

  //각 행 가져오기
  async rowData(startIdx, lastIdx, reqGubn, reqYmd, reqYmd2) {
    const data = await this.getApiData(
      'row',
      startIdx,
      lastIdx,
      reqGubn,
      reqYmd,
      reqYmd2,
    );
    return data;
  }

  //OPEN API 데이터 가져오기
  async getApiData(
    tag,
    startIdx,
    lastIdx,
    reqGubn,
    reqYmd,
    reqYmd2,
  ): Promise<any> {
    const key = this.openApiConfigService.apiKey;
    //const testUrl = `http://openapi.seoul.go.kr:8088/${key}/json/DrainpipeMonitoringInfo/1/5/01/2022030214/2022030315`;
    const url = `${key}/json/DrainpipeMonitoringInfo/${startIdx}/${lastIdx}/${reqGubn}/${reqYmd}/${reqYmd2}`;

    const responseData = await firstValueFrom(
      this.httpService
        .get<DrainpipeInfoOpenApiDto>(url)
        .pipe(map((response) => response.data)),
    );

    if (tag === 'row') {
      return responseData.DrainpipeMonitoringInfo.row;
    } else if (tag === 'count') {
      return responseData.DrainpipeMonitoringInfo.list_total_count;
    }
  }
}
