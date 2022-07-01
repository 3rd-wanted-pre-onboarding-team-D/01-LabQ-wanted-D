export class DrainpipeData {
    IDN: string;
    MEA_WAL: number;
    SIG_STA: string;

    constructor(
        IDN: string,
        MEA_WAL: number,
        SIG_STA: string,
    ){
        this.IDN = IDN;
        this.MEA_WAL = MEA_WAL;
        this.SIG_STA = SIG_STA;
    }
}