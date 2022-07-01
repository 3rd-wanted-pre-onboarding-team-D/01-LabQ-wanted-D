import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnomalyDetectionService } from './anomaly-detection.service';

@ApiTags('필터링 데이터 API')
@Controller('anomalydetection')
export class AnomalyDetectionController {
    constructor(private anomalyDetectionService: AnomalyDetectionService){}


    @Get('/gubn')
    async getGubnList(
    ){
        return this.anomalyDetectionService.getGubnList();
    }
    
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
