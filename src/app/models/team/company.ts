import { IComparable } from "../utilities/comparable";
import { IHoliday, Holiday } from "./holidays";

export interface ICompany {
    id: string;
    code: string;
    title: string;
    time_card_system: string;
    holidays: IHoliday[];
}

export class Company implements ICompany, IComparable<Company> {
    public id: string;
    public code: string;
    public title: string;
    public time_card_system: string;
    public holidays: Holiday[];

    constructor(other?: Company) {
        this.id = (other && other.id) ? other.id : "";
        this.code = (other && other.code) ? other.code : "";
        this.title = (other && other.title) ? other.title : "";
        this.time_card_system = (other && other.time_card_system) 
            ? other.time_card_system : "manual";
        this.holidays = new Array();
        if (other && other.holidays && other.holidays.length > 0 
            && this.holidays) {
            other.holidays.forEach(hol => {
                if (this.holidays) {
                    this.holidays.push(new Holiday(hol));
                }
            })
        }
    }

    public compareTo(other: Company): number {
        if (this.code === other.code) {
            return (this.title < other.title) ? -1 : 1;
        }
        return (this.code < other.code) ? -1 : 1;
    }
}