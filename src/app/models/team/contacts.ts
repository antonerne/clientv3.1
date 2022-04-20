import { IComparable } from "../utilities/comparable";

export interface IContactType {
    id: string
    code: string;
    description: string;
    is_required: boolean;
    display_order: number;
}

export class ContactType implements IContactType, IComparable<ContactType> {
    public id: string
    public code: string;
    public description: string;
    public is_required: boolean;
    public display_order: number;

    constructor(other?: IContactType) {
        this.id = (other && other.id) ? other.id : "";
        this.code = (other && other.code) ? other.code : "";
        this.description = (other && other.description) 
            ? other.description : "";
        this.is_required = (other && other.is_required) 
            ? other.is_required : false;
        this.display_order = (other && other.display_order) 
            ? other.display_order : 1;
    }

    public compareTo(other: ContactType): number {
        if (this.display_order === other.display_order) {
            return (this.code < other.code) ? -1 : 1;
        }
        return (this.display_order < other.display_order) ? -1 : 1;
    }
}