import { Test, TestingModule } from '@nestjs/testing';
import { DrainpipeMonitoringController } from './drainpipe-monitoring.controller';

describe('DrainpipeMonitoringController', () => {
  let controller: DrainpipeMonitoringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrainpipeMonitoringController],
    }).compile();

    controller = module.get<DrainpipeMonitoringController>(
      DrainpipeMonitoringController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
