export class RainfallData {
  RAINGAUGE_CODE: number;
  RAINGAUGE_NAME: string;
  RAINFALL10: number;

  constructor(
    RAINGAUGE_CODE: number,
    RAINGAUGE_NAME: string,
    RAINFALL10: number,
  ) {
    this.RAINGAUGE_CODE = RAINGAUGE_CODE;
    this.RAINGAUGE_NAME = RAINGAUGE_NAME;
    this.RAINFALL10 = RAINFALL10;
  }
}
