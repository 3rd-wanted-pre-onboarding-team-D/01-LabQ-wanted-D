import { DrainpipeData } from "./filtered-drainpipe.dto";
import { RainfallData } from "./filtered-rainfall.dto";

export class ResponseDto {
    drainpipeData: DrainpipeData[] = []
    rainfallData: RainfallData[] = []
}