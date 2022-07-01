import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { OpenApiConfigModule } from '../config/open-api/config.module';
import { RainfallService } from './rainfall.service';

describe('RainfallService', () => {
  let service: RainfallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        OpenApiConfigModule,
        HttpModule.register({ baseURL: 'http://openAPI.seoul.go.kr:8088' }),
      ],
      providers: [RainfallService],
    }).compile();

    service = module.get<RainfallService>(RainfallService);
  });

  describe('getTotalCount', () => {
    test('해당 지역구의 전체 개수를 리턴하는가', async () => {
      // given
      const guName = '강남구';

      // when
      const result = service['getTotalCount'](guName);

      // then
      await expect(result).resolves.toEqual(expect.any(Number));
    });
  });

  describe('getRainfallInfos', () => {
    test('해당하는 지역구의 모든 강우량을 가져오는가', async () => {
      // given
      const guName = '강남구';
      // when
      const result = await service.getRainfallInfos(guName);

      //then
      expect(result).toBeDefined();
      expect(result.list_total_count).toEqual(expect.any(Number));
      expect(result.data).toHaveLength(result.list_total_count);
    });
  });
});
