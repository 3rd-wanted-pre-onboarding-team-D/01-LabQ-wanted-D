import { Test, TestingModule } from '@nestjs/testing';
import { DrainpipeMonitoringModule } from '../drainpipe-monitoring/drainpipe-monitoring.module';
import { RainfallModule } from '../rainfall/rainfall.module';
import { AnomalyDetectionService } from './anomaly-detection.service';

describe('AnomalyDetectionService', () => {
  let service: AnomalyDetectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RainfallModule, DrainpipeMonitoringModule],
      providers: [AnomalyDetectionService],
    }).compile();

    service = module.get<AnomalyDetectionService>(AnomalyDetectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
