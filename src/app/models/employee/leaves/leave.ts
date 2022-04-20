import { IComparable } from "../../utilities/comparable";

export enum Statuses {
    REQUESTED = "requested",
    APPROVED = "approved",
    ACTUAL = "actual",
    DELETED = "deleted"
}

export interface ILeave {
    id?: string | undefined;
    leave_date: Date;
    code: string;
    hours: number;
    status: Statuses;
    leave_request_id?: string | undefined;
}

export class Leave implements ILeave, IComparable<Leave> {
    public id?: string | undefined;
    public leave_date: Date;
    public code: string;
    public hours: number;
    public status: Statuses;
    public leave_request_id?: string | undefined;

    constructor(other?: ILeave) {
        this.id = (other && other.id) ? other.id : "";
        this.leave_date = (other) ? new Date(other.leave_date) : new Date(0);
        this.code = (other) ? other.code : "";
        this.hours = (other) ? other.hours : 0;
        this.status = (other) ? other.status : Statuses.REQUESTED;
        this.leave_request_id = (other && other.leave_request_id) 
            ? other.leave_request_id : undefined;
    }

    compareTo(other: Leave): number {
        if (this.leave_date.getTime() === other.leave_date.getTime()) {
            return (this.status < other.status) ? -1 : 1;
        }
        return (this.leave_date.getTime() < other.leave_date.getTime())
            ? -1 : 1;
    }

    dateEqual(other: Date): boolean {
        if (this.leave_date.getFullYear() === other.getFullYear()
            && this.leave_date.getMonth() === other.getMonth()
            && this.leave_date.getDate() === other.getDate()) {
            return true;
        }
        return false;
    }
}