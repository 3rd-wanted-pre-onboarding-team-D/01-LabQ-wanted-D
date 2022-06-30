import { Test, TestingModule } from '@nestjs/testing';
import { OpenApiConfigModule } from './config.module';
import { OpenApiConfigService } from './config.service';

describe('OpenApiConfigService', () => {
  let service: OpenApiConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OpenApiConfigModule],
    }).compile();

    service = module.get<OpenApiConfigService>(OpenApiConfigService);
  });

  test('OPEN_API_KEY를 잘 가져오는가 리턴하는가', async () => {
    // given

    // when
    const key = service.apiKey;

    // then
    expect(key).toBeDefined();
  });
});
