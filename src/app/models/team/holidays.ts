import { IComparable } from "../utilities/comparable";

export interface IHoliday {
    id: string;
    code: string;
    title: string;
    actual_dates?: Date[];
    display_order: number;
}

export class Holiday implements IHoliday, IComparable<Holiday> {
    public id: string;
    public code: string;
    public title: string;
    public actual_dates?: Date[];
    public display_order: number;

    constructor(other?: IHoliday) {
        this.id = (other && other.id) ? other.id : "";
        this.code = (other && other.code) ? other.code : "";
        this.title = (other && other.title) ? other.title : "";
        this.display_order = (other && other.display_order) ? other.display_order : 0;
        if (other && other.actual_dates) {
            other.actual_dates.forEach(dt => {
                if (this.actual_dates) {
                    this.actual_dates.push(new Date(dt));
                }
            });
        }
    }

    public compareTo(other: Holiday): number {
        if (other.display_order === this.display_order) {
            return (this.code < other.code) ? -1 : 1;
        }
        return (this.display_order < other.display_order) ? -1 : 1;
    }
}