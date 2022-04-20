import { IComparable } from "../../utilities/comparable";
import { Leave, Statuses } from "./leave";

export interface ILeaveRequestComment {
    id?: string | undefined;
    comment_date: Date;
    comment: string;
}

export class LeaveRequestComment 
    implements ILeaveRequestComment, IComparable<LeaveRequestComment> {
    public id?: string | undefined;
    public comment_date: Date;
    public comment: string;

    constructor(other?: ILeaveRequestComment) {
        this.id = (other && other.id) ? other.id : "";
        this.comment_date = (other) ? other.comment_date : new Date();
        this.comment = (other) ? other.comment : "";
    }

    compareTo(other: LeaveRequestComment): number {
        return (this.comment_date.getTime() < other.comment_date.getTime()) 
            ? -1 : 1;
    }
}

export interface ILeaveRequest {
    _id?: string | undefined;
    employee: string;
    site: string;
    start_date: Date;
    end_date: Date;
    createdOn: Date;
    deleteRequest?: Date | undefined;
    updatedOn: Date | undefined;
    status: Statuses;
    comments?: ILeaveRequestComment[] | undefined;
    days?: Leave[] | undefined;
    approvedBy?: string | undefined;
}

export class LeaveRequest implements ILeaveRequest, IComparable<LeaveRequest> {
    public _id?: string | undefined;
    public employee: string;
    public site: string;
    public start_date: Date;
    public end_date: Date;
    public createdOn: Date;
    public deleteRequest?: Date | undefined;
    public updatedOn: Date | undefined;
    public status: Statuses;
    public comments?: LeaveRequestComment[] | undefined;
    public days?: Leave[] | undefined;
    public approvedBy?: string | undefined;

    constructor(other?: ILeaveRequest) {
        this._id = (other && other._id) ? other._id : undefined;
        this.site = (other) ? other.site : "";
        this.start_date = (other) ? other.start_date : new Date();
        this.end_date = (other) ? other.end_date : new Date();
        this.createdOn = (other) ? new Date(other.createdOn) : new Date(0)
        this.deleteRequest = (other && other.deleteRequest) 
            ? other.deleteRequest : undefined;
        this.updatedOn = (other) ? other.updatedOn : new Date(0);
        this.status = (other) ? other.status : Statuses.REQUESTED;
        this.comments = [];
        if (other && other.comments) {
            other.comments.forEach(cmt => {
                if (this.comments) {
                    this.comments.push(new LeaveRequestComment(cmt));
                }
            });
        }
        this.days = [];
        if (other && other.days) {
            other.days.forEach(day => {
                if (this.days) {
                    this.days.push(new Leave(day));
                }
            });
        }
        this.employee = (other && other.employee) 
            ? other.employee : "";
        this.approvedBy = (other && other.approvedBy) 
            ? other.approvedBy : undefined;
    }

    compareTo(other: LeaveRequest): number {
        if (this.start_date.getTime() === other.start_date.getTime()) {
            if (this.createdOn.getTime() === other.createdOn.getTime()) {
                return (this.end_date.getTime() < other.end_date.getTime()) 
                    ? -1 : 1;
            }
            return (this.createdOn.getTime() < other.createdOn.getTime())
                ? -1 : 1;
        }
        return (this.start_date.getTime() < other.start_date.getTime()) ? -1 : 1;
    }

    setDates(start: Date, end: Date) {
        if (start.getTime() > end.getTime()) {
            let temp = start;
            start = end;
            end = temp;
        }
        this.start_date = start;
        this.end_date = end;
        this.status = Statuses.REQUESTED;
        this.setDaysAfterChange();
    }

    setStartDate(start: Date) {
        this.start_date = start;
        if (this.end_date.getTime() < start.getTime()) {
            this.end_date = start;
        }
        this.status = Statuses.REQUESTED;
        this.setDaysAfterChange();
    }

    setEndDate(end: Date) {
        this.end_date = end;
        if (this.start_date.getTime() > end.getTime()) {
            this.start_date = end;
        }
        this.status = Statuses.REQUESTED;
        this.setDaysAfterChange();
    }

    private setDaysAfterChange() {
        // get rid of leave dates not included in the date range
        if (this.days) {
            for (let i = this.days.length - 1; i >= 0; i--) {
                if (this.days[i].leave_date.getTime() < this.start_date.getTime()
                || this.days[i].leave_date.getTime() > this.end_date.getTime()) {
                    this.days.splice(i , 1);
                }
            }
        } else {
            this.days = new Array();
        }

        // now step through the days from start to end and add if not already
        // present in the array.
        let current = new Date(this.start_date);
        while (current.getTime() <= this.end_date.getTime()) {
            let found = false;
            if (this.days) {
                for (let i=0; i < this.days.length && !found; i++) {
                    if (this.days[i].leave_date.getTime() === current.getTime()) {
                        found = true;
                    }
                }
            }
            if (!found) {
                const lv = new Leave();
                lv.leave_date = current;
                lv.code = "";
                lv.hours = 0;
                this.days.push(lv);
            }
            current = new Date(current.getTime() + (24 * 60 * 60 * 1000));
        }

        // sort the days array to put them in date order
        this.days.sort((a,b) => a.compareTo(b));
    }

    setDay(day: Date, code: string, hours: number): boolean {
        let found = false;
        if (this.days) {
            for (let i=0; i < this.days.length && !found; i++) {
                if (this.days[i].leave_date.getTime() === day.getTime()) {
                    found = true;
                    this.days[i].code = code;
                    this.days[i].hours = hours;
                }
            }
        }
        return found
    }
}