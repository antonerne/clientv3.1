import { IEmployee, Employee } from "../employee/employee";
import { IComparable } from "../utilities/comparable";
import { ISiteLaborCode, SiteLaborCode } from "./laborcode";
import { IWorkcenter, Workcenter } from "./workcenter";
import { IWorkCode, WorkCode } from "./workcode";

export interface ISite {
    id: string;
    code: string;
    title: string;
    utc_difference: number;
    work_codes?: IWorkCode[] | undefined;
    labor_codes?: ISiteLaborCode[] | undefined;
    work_centers?: IWorkcenter[] | undefined;
    employees?: IEmployee[] | undefined;
    date_created?: Date;
    last_updated?: Date;
}

export class Site implements IComparable<Site> {
    public id: string;
    public code: string;
    public title: string;
    public utc_difference: number;
    public work_codes?: WorkCode[] | undefined;
    public labor_codes?: SiteLaborCode[] | undefined;
    public work_centers?: Workcenter[] | undefined;
    public employees?: Employee[] | undefined;
    public date_created?: Date;
    public last_updated?: Date;

    constructor(other?: Site) {
        this.id = (other && other.id) ? other.id : "";
        this.code = (other) ? other.code : "";
        this.title = (other) ? other.title : "";
        this.utc_difference = (other) ? other.utc_difference : 0;
        this.work_codes = [];
        if (other && other.work_codes) {
            other.work_codes.forEach(wc => {
                if (this.work_codes) {
                    this.work_codes.push(new WorkCode(wc));
                }
            });
        }
        this.work_centers = [];
        if (other && other.work_centers ) {
            other.work_centers.forEach(wc => {
                if (this.work_centers) {
                    this.work_centers.push(new Workcenter(wc));
                }
            });
        }
        this.labor_codes = [];
        if (other && other.labor_codes) {
            other.labor_codes.forEach(lc => {
                if (this.labor_codes) {
                    this.labor_codes.push(new SiteLaborCode(lc));
                }
            });
        }
        if (other && other.employees && other.employees.length > 0) {
            this.employees = [];
            for (let emp of other.employees) {
                if (this.employees) {
                    this.employees.push(new Employee(emp));
                }
            }
        }
        this.date_created = (other && other.date_created)
            ? new Date(other.date_created) : new Date(0);
        this.last_updated = (other && other.last_updated) 
            ? new Date(other.last_updated) : new Date(0);
    }

    compareTo(other: Site): number {
        if (this.code === other.code) {
            return (this.title < other.title) ? -1 : 1;
        }
        return (this.code < other.code) ? -1 : 1;
    }
}