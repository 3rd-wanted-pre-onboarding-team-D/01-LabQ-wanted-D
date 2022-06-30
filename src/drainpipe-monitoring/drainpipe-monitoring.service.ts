import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { ResponseDrainpipeInfoDto } from './response.drainpipe-info.dto';
import { DrainpipeInfoOpenApiDto } from './dto/drainpipe-info-openapi.dto';
import { start } from 'repl';
import { Any } from 'typeorm';

@Injectable()
export class DrainpipeMonitoringService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  //행 전체 개수 구하기
  async getDataTotalCount(reqGubn, reqYmd, reqYmd2) {
    const data = await this.getApiData(1, 1, reqGubn, reqYmd, reqYmd2);
    return data.DrainpipeMonitoringInfo.list_total_count;
  }

  async getDrainpipeApi(
    reqGubn,
    reqYmd,
    reqYmd2,
  ): Promise<ResponseDrainpipeInfoDto[]> {
    //데이터 총 개수
    const totalDataCount = await this.getDataTotalCount(
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
    if (totalDataCount < repeat * 1000) {
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
    const data = await (
      await this.getApiData(startIdx, lastIdx, reqGubn, reqYmd, reqYmd2)
    ).DrainpipeMonitoringInfo.row;
    return data;
  }

  //OPEN API 데이터 가져오기
  async getApiData(startIdx, lastIdx, reqGubn, reqYmd, reqYmd2) {
    const key = this.configService.get<string>('OPEN_API_KEY');
    //const testUrl = `http://openapi.seoul.go.kr:8088/${key}/json/DrainpipeMonitoringInfo/1/5/01/2022030214/2022030315`;
    const url = `http://openapi.seoul.go.kr:8088/${key}/json/DrainpipeMonitoringInfo/${startIdx}/${lastIdx}/${reqGubn}/${reqYmd}/${reqYmd2}`;

    const responseData = await firstValueFrom(
      this.httpService
        .get<DrainpipeInfoOpenApiDto>(url)
        .pipe(map((response) => response.data)),
    );
    return responseData;
  }
}
