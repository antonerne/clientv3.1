import { IEmployee, Employee } from "../employee/employee";
import { IComparable } from "../utilities/comparable";

export interface IPosition {
    id: string;
    title: string;
    is_displayed: boolean;
    display_order: number;
    employees?: IEmployee[] | undefined;

}

export class Position implements IPosition, IComparable<Position> {
    public id: string;
    public title: string;
    public is_displayed: boolean;
    public display_order: number;
    public employees?: Employee[] | undefined;

    constructor(other?: Position) {
        this.id = (other && other.id) ? other.id : "";
        this.title = (other) ? other.title : "";
        this.is_displayed = (other) ? other.is_displayed : false;
        this.display_order = (other) ? other.display_order : 0;
        this.employees = new Array();
        if (other && other.employees) {
            for (let emp of other.employees) {
                this.employees.push(new Employee(emp));
            }
        }
    }

    compareTo(other: Position): number {
        return (this.display_order < other.display_order) ? -1 : 1;
    }
}

export interface IShift {
    id: string;
    title: string;
    display_order: number;
    shift_codes: string;
    minimums: number;
    employees?: IEmployee[] | undefined;
}

export class Shift implements IShift, IComparable<Shift> {
    public id: string;
    public title: string;
    public display_order: number;
    public shift_codes: string;
    public minimums: number;
    public employees?: Employee[] | undefined;

    constructor(other?: Shift) {
        this.id = (other && other.id) ? other.id : "";
        this.title = (other) ? other.title : "";
        this.display_order = (other) ? other.display_order : 0;
        this.shift_codes = (other && other.shift_codes) ? other.shift_codes : "";
        this.minimums = (other) ? other.minimums : 0;
        this.employees = new Array();
        if (other && other.employees) {
            for (let emp of other.employees) {
                this.employees.push(new Employee(emp));
            }
        }
    }

    compareTo(other: Shift): number {
        return (this.display_order < other.display_order) ? -1 : 1;
    }
}

export interface IWorkcenter {
    id: string;
    title: string;
    display_order: number;
    positions?: IPosition[];
    shifts?: IShift[];
    employees?: IEmployee[];
}

export class Workcenter implements IWorkcenter, IComparable<Workcenter> {
    public id: string;
    public title: string;
    public display_order: number;
    public positions?: Position[];
    public shifts?: Shift[];
    public employees?: Employee[];

    constructor(other?: Workcenter) {
        this.id = (other && other.id) ? other.id : "";
        this.title = (other) ? other.title : "";
        this.display_order = (other) ? other.display_order : 0;
        if (other && other.positions) {
            this.positions = [];
            for (let pos of other.positions) {
                if (this.positions) {
                    this.positions.push(new Position(pos));
                }
            }
        }
        if (other && other.shifts) {
            this.shifts = [];
            for (let shft of other.shifts) {
                if (this.shifts) {
                    this.shifts.push(new Shift(shft));
                }
            }
        }
        if (other && other.employees) {
            this.employees = [];
            for (let emp of other.employees) {
                if (this.employees) {
                    this.employees.push(new Employee(emp));
                }
            }
        }
    }

    compareTo(other: Workcenter): number {
        return (this.display_order < other.display_order) ? -1 : 1;
    }
}