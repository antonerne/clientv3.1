import { IComparable } from "../../utilities/comparable";

export interface IWorkday {
    id?: string
    day: number;
    work_center?: string;
    start_hour: number;
    code: string;
    hours_worked: number;
    is_leave?: boolean;
}

export class WorkDay implements IWorkday, IComparable<IWorkday> {
    public day: number;
    public work_center?: string | undefined;
    public start_hour: number;
    public code: string;
    public hours_worked: number;
    public is_leave?: boolean;

    constructor(other?: IWorkday) {
        this.day = (other) ? other.day : 0;
        this.work_center = (other && other.work_center) 
            ? other.work_center : undefined;
        this.start_hour = (other) ? other.start_hour : -1;
        this.code = (other) ? other.code : "";
        this.hours_worked = (other) ? other.hours_worked : 0;
        this.is_leave = (other && other.is_leave) ? other.is_leave : false;
    }

    compareTo(other: IWorkday): number {
        return (this.day < other.day) ? -1 : 1;
    }
}