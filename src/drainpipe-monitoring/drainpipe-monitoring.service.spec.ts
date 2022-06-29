import { Test, TestingModule } from '@nestjs/testing';
import { DrainpipeMonitoringService } from './drainpipe-monitoring.service';

describe('DrainpipeMonitoringService', () => {
  let service: DrainpipeMonitoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrainpipeMonitoringService],
    }).compile();

    service = module.get<DrainpipeMonitoringService>(
      DrainpipeMonitoringService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
