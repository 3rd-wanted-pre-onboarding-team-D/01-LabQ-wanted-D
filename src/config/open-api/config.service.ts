import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  get apiKey(): string {
    return this.configService.get<string>('OPEN_API_KEY');
  }
}
