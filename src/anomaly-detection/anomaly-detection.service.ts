import { Injectable, Logger } from '@nestjs/common';
import { DrainpipeMonitoringService } from 'src/drainpipe-monitoring/drainpipe-monitoring.service';
import { ResponseDrainpipeInfoDto } from 'src/drainpipe-monitoring/dto/response.drainpipe-info.dto';
import { GetRainfallInfos } from 'src/rainfall/dto/get-rainfall-infos';
import { RainfallInfo } from 'src/rainfall/dto/rainfall-info.dto';
import { RainfallService } from 'src/rainfall/rainfall.service';
import { ResponseDto } from './dto/detection-list.dto';
import { DrainpipeData } from './dto/filtered-drainpipe.dto';
import { RainfallData } from './dto/filtered-rainfall.dto';
import { GubnList } from './gubn-list';

@Injectable()
export class AnomalyDetectionService {
    constructor(
        private drainpipeMonitoringService: DrainpipeMonitoringService,
        private rainfallService: RainfallService,
    ){}

    async getGubnList(){
        return GubnList;
    }

    async getDateByRegion(
        gubn: string,
        startDate: string,
        endDate: string,
    ){
        // Param으로 받은 구분번호가 1~9일 때 01~09로 변경
        if('1'<=gubn && gubn<='9'){
            gubn = '0' + gubn;
        }

        const DrainpipeDataList: ResponseDrainpipeInfoDto[] = await this.drainpipeMonitoringService.getDrainpipeApi(
            gubn,
            startDate,
            endDate,
        );
        
        const guName: string = (await DrainpipeDataList)[0].GUBN_NAM;

        const rainfallDataList: GetRainfallInfos = await this.rainfallService.getRainfallInfos(guName); 
        
        rainfallDataList.data.sort((a: RainfallInfo, b: RainfallInfo): number => {
            return new Date(b.RECEIVE_TIME).getTime() - new Date(a.RECEIVE_TIME).getTime();
        });

        // Response Data Structure 정의
        const FilteredDataList: Map<string, ResponseDto> = new Map();

        // 기준이 되는 시간대
        const start: string = `${startDate.substring(0,4)}-${startDate.substring(4,6)}-${startDate.substring(6,8)} ${startDate.substring(8,10)}`
        const end: string = `${endDate.substring(0,4)}-${endDate.substring(4,6)}-${endDate.substring(6,8)} ${endDate.substring(8,10)}`
        
        // 강우량 데이터 삽입
        rainfallDataList.data.forEach((data)=>{
            let date: Date = new Date(data.RECEIVE_TIME);
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset*60*1000))

            const dataDate: string = date.toISOString().split('T')[0];
            const dataTime: string = date.toISOString().split('T')[1].substring(0,2);
            const compareData: string = dataDate+ ' ' + dataTime;

            if(start <= compareData && compareData <= end){
                const key: string = dataDate + " "+ date.toISOString().split('T')[1].substring(0,5);
                
                // Map에 해당 날짜+시간 키가 없는 경우
                if(!FilteredDataList.has(key)){
                    FilteredDataList.set(key, new ResponseDto);
                }

                FilteredDataList.get(key).rainfallData.push(
                    new RainfallData(data.RAINGAUGE_CODE, data.RAINGAUGE_NAME, data.RAINFALL10),
                );
            }
            else if(start > compareData){
                return false;
            }
        });

        // 하수관로 데이터 삽입
        DrainpipeDataList.forEach((data)=> {
            const compareData: string = data.MEA_YMD.substring(0, 16);

            if(FilteredDataList.has(compareData)){
                FilteredDataList.get(compareData).drainpipeData.push(
                    new DrainpipeData(
                        data.IDN, 
                        data.MEA_WAL, 
                        data.SIG_STA,
                    ),
                );
            }
        });

        return { region: guName, FilteredDataList };
    }
}