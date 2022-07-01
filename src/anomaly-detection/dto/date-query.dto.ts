import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class DateQuery {
  @ApiProperty()
  @Matches(/\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-9]|2[0-4])/)
  @IsNotEmpty()
  //yyyymmddhh
  start!: string;

  @ApiProperty()
  @Matches(/\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-9]|2[0-4])/)
  @IsNotEmpty()
  end!: string;
}
