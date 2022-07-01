import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ok } from 'assert';
import { AnomalyDetectionService } from './anomaly-detection.service';
import { DateQuery } from './dto/date-query.dto';
import { Gubn } from './dto/gubn.dto';
import { GubnList } from './gubn-list';

@ApiTags('필터링 데이터 API')
@Controller('anomalydetection')
export class AnomalyDetectionController {
  constructor(private anomalyDetectionService: AnomalyDetectionService) {}

  @ApiResponse({
    description: 'GUBN(구분코드)와 자치구 데이터를 확인',
    status: 200,
    schema: {
      example: {
        statusCode: 200,
        message: 'OK',
        data: GubnList,
      },
    },
  })
  @ApiOperation({ summary: 'GUBN과 자치구 정보 가져오기' })
  @Get('/gubn')
  async getGubnList() {
    return this.anomalyDetectionService.getGubnList();
  }

  @ApiParam({
    description: 'GUBN (구분코드)',
    name: 'gubn',
    schema: {
      example: { gubn: 1 },
    },
  })
  @ApiQuery({
    description: '쿼리 시작 날짜',
    name: 'start',
    schema: {
      example: { start: 2022063000 },
    },
  })
  @ApiQuery({
    description: '쿼리 종료 날짜',
    name: 'end',
    schema: {
      example: { end: 2022063023 },
    },
  })
  @ApiResponse({
    description: '쿼리 성공',
    status: 200,
    schema: {
      example: {
        statusCode: 200,
        message: ok,
        data: {
          region: '종로',
          FilteredDataList: {
            '2022-06-30 23:59': {
              drainpipeData: [
                {
                  IDN: '01-0004',
                  MEA_WAL: 0.27,
                  SIG_STA: '통신양호',
                },
                {
                  IDN: '01-0003',
                  MEA_WAL: 0.19,
                  SIG_STA: '통신양호',
                },
                {
                  IDN: '01-0002',
                  MEA_WAL: 0,
                  SIG_STA: '통신양호',
                },
                {
                  IDN: '01-0001',
                  MEA_WAL: 0.34,
                  SIG_STA: '통신양호',
                },
              ],
              rainfallData: [
                {
                  RAINGAUGE_CODE: 1002,
                  RAINGAUGE_NAME: '부암동',
                  RAINFALL10: 0,
                },
                {
                  RAINGAUGE_CODE: 1001,
                  RAINGAUGE_NAME: '종로구청',
                  RAINFALL10: 0,
                },
              ],
            },
            '2022-06-30 23:49': {
              drainpipeData: [
                {
                  IDN: '01-0003',
                  MEA_WAL: 0.2,
                  SIG_STA: '통신양호',
                },
                {
                  IDN: '01-0002',
                  MEA_WAL: 0,
                  SIG_STA: '통신양호',
                },
                {
                  IDN: '01-0001',
                  MEA_WAL: 0.35,
                  SIG_STA: '통신양호',
                },
                {
                  IDN: '01-0004',
                  MEA_WAL: 0.27,
                  SIG_STA: '통신양호',
                },
              ],
              rainfallData: [
                {
                  RAINGAUGE_CODE: 1001,
                  RAINGAUGE_NAME: '종로구청',
                  RAINFALL10: 0,
                },
                {
                  RAINGAUGE_CODE: 1002,
                  RAINGAUGE_NAME: '부암동',
                  RAINFALL10: 0,
                },
              ],
            },
            etc: '...',
          },
        },
      },
    },
  })
  @ApiOperation({ summary: '필터링 데이터 가져오기' })
  @Get(':gubn')
  async getDataByRegion(@Param() param: Gubn, @Query() query: DateQuery) {
    const { gubn } = param;
    const { start, end } = query;

    return this.anomalyDetectionService.getDateByRegion(gubn, start, end);
  }
}
