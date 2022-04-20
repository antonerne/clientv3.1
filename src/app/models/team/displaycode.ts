import { IComparable } from "../utilities/comparable";

export interface IDisplayCode {
    id: string;
    code: string;
    name: string;
    back_color: string;
    text_color: string;
    is_leave: boolean;
    display_order: number;
}

export class DisplayCode implements IDisplayCode, IComparable<DisplayCode> {
    public id: string;
    public code: string;
    public name: string;
    public back_color: string;
    public text_color: string;
    public is_leave: boolean;
    public display_order: number;

    constructor(other?: IDisplayCode) {
        this.id = (other && other.id) ? other.id : "";
        this.code = (other && other.code) ? other.code : "";
        this.name = (other && other.name) ? other.name : "";
        this.back_color = (other && other.back_color) 
            ? other.back_color : "000000";
        this.text_color = (other && other.text_color) 
            ? other.text_color : "ffffff";
        this.is_leave = (other && other.is_leave) ? other.is_leave : false;
        this.display_order = (other && other.display_order) 
            ? other .display_order : 0;
    }

    public compareTo(other: DisplayCode): number {
        if (this.display_order === other.display_order) {
            return (this.code < other.code) ? -1 : 1;
        }
        return (this.display_order < other.display_order) ? -1 : 1;
    }
}