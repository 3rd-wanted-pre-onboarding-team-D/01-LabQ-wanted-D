import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Gubn {
  @ApiProperty()
  @IsNotEmpty()
  //yyyymmddhh
  gubn!: string;
}
