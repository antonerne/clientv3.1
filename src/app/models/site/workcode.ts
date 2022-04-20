import { IComparable } from "../utilities/comparable";

export interface IWorkCode {
    id: string;
    code: string;
    starttime?: number | undefined;
    shift_pay_code?: number | undefined;
}

export class WorkCode implements IWorkCode, IComparable<WorkCode> {
    public id: string;
    public code: string;
    public starttime?: number | undefined;
    public shift_pay_code?: number | undefined;

    constructor(other?: WorkCode) {
        this.id = (other && other.id) ? other.id : "";
        this.code = (other) ? other.code : "";
        this.starttime = (other && other.starttime) ? other.starttime : 8;
        this.shift_pay_code = (other && other.shift_pay_code) 
            ? other.shift_pay_code : 0;
    }

    compareTo(other: WorkCode): number {
        return (this.code < other.code) ? -1 : 1;
    }
}