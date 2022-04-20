import { IComparable } from "../../utilities/comparable";
import { Schedule } from "./schedule";
import { IWorkday, WorkDay } from "./workday";

export interface IAssignment {
    id?: string;
    start_date: Date;
    end_date: Date;
    site: string;
    days_in_rotation: number;
    job_title: string;
    schedules?: Schedule[];
}

export class Assignment implements IAssignment, IComparable<Assignment> {
    public id?: string;
    public start_date: Date;
    public end_date: Date;
    public site: string;
    public days_in_rotation: number;
    public job_title: string;
    public schedules?: Schedule[];

    constructor(other?: IAssignment) {
        this.id = (other && other.id) ? other.id : "";
        this.start_date = (other) ? new Date(other.start_date) : new Date(0);
        this.end_date = (other) ? new Date(other.end_date) : new Date(9999, 12, 31);
        this.site = (other) ? other.site : "";
        this.days_in_rotation = (other) ? other.days_in_rotation : 7;
        this.job_title = (other) ? other.job_title : "";
        this.schedules = [];
        if (other && other.schedules) {
            other.schedules.forEach( sch => {
                if (this.schedules) {
                    this.schedules.push(new Schedule(sch));
                }
            });
        }
    }

    compareTo(other: Assignment): number {
        if (this.start_date.getTime() === other.start_date.getTime()) {
            return (this.end_date.getTime() < other.end_date.getTime())
                ? -1 : 1;
        }
        return (this.start_date.getTime() < other.start_date.getTime()) ? -1 : 1;
    }

    addSchedule(days: number): Error | undefined {
        let schID: number = -1;
        if (this.schedules) {
            for (let sch of this.schedules) {
                if (sch.order > schID) {
                    schID = sch.order;
                }
            }
        } else {
            this.schedules = new Array();
        }
        const sch = new Schedule();
        sch.order = schID + 1;
        let err = sch.setDaysInSchedule(days);
        if (err) {
            return err;
        } else {
            this.schedules.push(sch);
        }
        return undefined;
    }

    isActiveOnDate(ckDate: Date): boolean {
        if (this.start_date.getTime() === 0) return false;
        if (this.start_date.getTime() <= ckDate.getTime() 
            && this.end_date.getTime() >= ckDate.getTime()) return true;
        return false;
    }

    isActiveDuringPeriod(start: Date, end: Date): boolean {
        if (this.start_date.getTime() === 0) return false;
        if (this.end_date.getTime() >= start.getTime() 
            && this.start_date.getTime() <= end.getTime()) return true;
        return false;
    }

    getSchedule(ckDate: Date): Schedule | undefined {
        if (this.schedules) {
            if (this.schedules.length === 0) return undefined;
            if (this.schedules) {
                this.schedules.sort((a,b) => a.compareTo(b));
                if (this.days_in_rotation === 0) return this.schedules[0];
                let days = Math.floor((ckDate.getTime() - this.start_date.getTime()) 
                    / (24 * 60 * 60 * 1000));
                let schID = Math.abs(Math.floor(days/this.days_in_rotation)) 
                    % this.schedules.length;
                return this.schedules[schID];
            }
        }
        return undefined;
    }

    getWorkday(ckDate: Date): IWorkday | undefined {
        const sched = this.getSchedule(ckDate);
        if (!sched) return undefined;
        if (sched.workdays) {
            sched.workdays.sort((a,b) => a.compareTo(b));
            let day = Math.floor((ckDate.getTime() - this.start_date.getTime()) 
                / (24 * 60 * 60 * 1000)) % sched.workdays.length;
            return sched.workdays[day];
        }
        return undefined;
    }

    getWorkcenterForPeriod(start: Date, end: Date): [string, number] {
        let wkctrMap = new Map<string, number>();
        if (!this.isActiveDuringPeriod(start, end)) return ["", 0]
        let current = new Date(start);

        while (current.getTime() < end.getTime()) {
            const wd = this.getWorkday(current);
            if (wd && wd.work_center && wd.start_hour >= 0) {
                if (wkctrMap.has(wd.work_center)) {
                    let num = wkctrMap.get(wd.work_center);
                    if (num) {
                        num++;
                        wkctrMap.set(wd.work_center, num);
                    }

                } else {
                    wkctrMap.set(wd.work_center, 1);
                }
            }
            current = new Date(current.getTime() + (24 * 60 * 60 * 1000));
        }

        let wkctr = "";
        let amount = 0;

        wkctrMap.forEach((value, key) => {
            if (value > amount) {
                amount = value;
                wkctr = key;
            }
        });
        return [wkctr, amount];
    }

    getStandardDailyHours(): number {
        let workhours = 0;
        if (this.schedules && this.schedules.length > 0) {
            const sched = this.schedules[0];
            if (sched.workdays) {
                for (let i=0; i < sched.workdays.length; i++ ) {
                    if (sched.workdays[i].hours_worked > workhours) {
                        workhours = sched.workdays[i].hours_worked;
                    }
                }
            }
        }
        return workhours;
    }
}