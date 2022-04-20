import { IComparable } from "../utilities/comparable";
import { Site } from "./site";

export interface ISiteLaborCode {
    id?: string | undefined;
    charge_number: string;
    extension: string;
    company_code: string;
    division: string;
    clin: string;
    slin: string;
    location: string;
    wbs: string;
    minimum: number;
    no_employee_placecard: string;
    contract_hours_per_employee: number;
    is_exercise: boolean;
    start_date: Date;
    end_date: Date;
}

export interface IEmployeeLaborCode {
    id?: string | undefined;
    charge_number: string;
    extension: string;
    company_code: string;
    start_date: Date;
    end_date: Date;
}

export class EmployeeLaborCode 
    implements IEmployeeLaborCode, IComparable<IEmployeeLaborCode> {
    public id?: string | undefined;
    public charge_number: string;
    public extension: string;
    public company_code: string;
    public start_date: Date;
    public end_date: Date;

    constructor(other?: IEmployeeLaborCode) {
        this.id = (other && other.id) ? other.id : "";
        this.charge_number = (other) ? other.charge_number : "";
        this.extension = (other) ? other.extension : "";
        this.company_code = (other) ? other.company_code : "";
        this.start_date = (other) ? new Date(other.start_date) : new Date(0);
        this.end_date = (other) ? new Date(other.end_date) : new Date(0);
    }

    compareTo(other: EmployeeLaborCode): number {
        if (this.charge_number === other.charge_number) {
            return (this.extension < other.extension) ? -1 : 1;
        }
        return (this.charge_number < other.charge_number) ? -1 : 1;
    }
}

export class SiteLaborCode 
    implements ISiteLaborCode, IComparable<ISiteLaborCode> {
    public id?: string | undefined;
    public charge_number: string;
    public extension: string;
    public company_code: string;
    public division: string;
    public clin: string;
    public slin: string;
    public location: string;
    public wbs: string;
    public minimum: number;
    public no_employee_placecard: string;
    public contract_hours_per_employee: number;
    public is_exercise: boolean;
    public start_date: Date;
    public end_date: Date;

    constructor(other?: ISiteLaborCode) {
        this.id = (other && other.id) ? other.id : "";
        this.charge_number = (other) ? other.charge_number : "";
        this.extension = (other) ? other.extension : "";
        this.company_code = (other) ? other.company_code : "";
        this.division = (other) ? other.division : "";
        this.clin = (other) ? other.clin : "";
        this.slin = (other) ? other.slin : "";
        this.location = (other) ? other.location : "";
        this.wbs = (other) ? other.wbs : "";
        this.minimum = (other) ? other.minimum : 0;
        this.no_employee_placecard = (other) ? other.no_employee_placecard : "VACANT";
        this.contract_hours_per_employee = (other) ? other.contract_hours_per_employee : 0.0;
        this.is_exercise = (other) ? other.is_exercise : false;
        this.start_date = (other) ? other.start_date : new Date(0);
        this.end_date = (other) ? other.end_date : new Date(0);
    }

    compareTo(other: SiteLaborCode): number {
        if (this.charge_number === other.charge_number) {
            return (this.extension < other.extension) ? -1 : 1;
        }
        return (this.charge_number < other.charge_number) ? -1 : 1;
    }
}