import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ok } from 'assert';
import { AnomalyDetectionService } from './anomaly-detection.service';

@ApiTags('필터링 데이터 API')
@Controller('anomalydetection')
export class AnomalyDetectionController {
    constructor(private anomalyDetectionService: AnomalyDetectionService){}

    @ApiResponse({
        description: 'GUBN(구분코드)와 자치구 데이터를 확인',
        status: 200,
        schema: {
            example: {
                statusCode: 200,
                message: 'OK',
                data: [
                    { '01': '종로' },
                    { '02': '중' },
                    { '03': '용산' },
                    { '04': '성동' },
                    { '05': '광진' },
                    { '06': '동대문' },
                    { '07': '중랑' },
                    { '08': '성북' },
                    { '09': '강북' },
                    { '10': '도봉' },
                    { '11': '노원' },
                    { '12': '은평' },
                    { '13': '서대문' },
                    { '14': '마포' },
                    { '15': '양천' },
                    { '16': '강서' },
                    { '17': '구로' },
                    { '18': '금천' },
                    { '19': '영등포' },
                    { '20': '동작' },
                    { '21': '관악' },
                    { '22': '서초' },
                    { '23': '강남' },
                    { '24': '송파' },
                    { '25': '강동' },
                ],
            },
        },
    })
    @ApiOperation({ summary: 'GUBN과 자치구 정보 가져오기' })
    @Get('/gubn')
    async getGubnList(
    ){
        return this.anomalyDetectionService.getGubnList();
    }
    
    @ApiParam({
        description: 'GUBN (구분코드)',
        name: 'gubn',
        schema: {
            example: { gubn: 1 },
        }
    })
    @ApiQuery({
        description: '쿼리 시작 날짜',
        name: 'start',
        schema: {
            example: { start: 2022063000 },
        }
    })
    @ApiQuery({
        description: '쿼리 종료 날짜',
        name: 'end',
        schema: {
            example: { end: 2022063023 },
        }
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
                                }
                            ]
                        },
                        '2022-06-30 23:49': {
                            drainpipeData: [
                                {
                                  IDN: '01-0003',
                                  MEA_WAL: 0.2,
                                  SIG_STA: '통신양호'
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
                                  SIG_STA: '통신양호'
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
                                  RAINFALL10: 0
                                },
                            ],
                        },
                        etc : '...'
                    },
                },
            },
        },
    })
    @ApiOperation({ summary: '필터링 데이터 가져오기' })
    @Get(':gubn')
    async getDataByRegion(
        @Param('gubn') gubn: string,
        @Query('start') startDate: string,
        @Query('end') endDate: string,
    ){
        return this.anomalyDetectionService.getDateByRegion(
            gubn,
            startDate,
            endDate,
        );
    }

}
