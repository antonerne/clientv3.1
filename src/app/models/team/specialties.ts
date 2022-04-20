import { IComparable } from "../utilities/comparable";

export interface ISpecialty {
    id: string
    code: string;
    title: string;
    description?: string | undefined;
}

export class Specialty implements ISpecialty, IComparable<Specialty> {
    public id: string
    public code: string;
    public title: string;
    public description?: string | undefined;

    constructor(other?: ISpecialty) {
        this.id = (other && other.id) ? other.id : "";
        this.code = (other && other.code) ? other.code : "";
        this.title = (other && other.title) ? other.title : "";
        this.description = (other && other.description) ? other.description : "";
    }

    public compareTo(other: Specialty): number {
        if (other.title.toLowerCase() === this.title.toLowerCase()) {
            return 0;
        }
        return (this.title.toLowerCase() < other.title.toLowerCase()) ? -1 : 1;
    }
}

export interface ISpecialtyGroup {
    id: string;
    code: string;
    title: string;
    areas?: ISpecialty[] | undefined;
}

export class SpecialtyGroup 
    implements ISpecialtyGroup, IComparable<SpecialtyGroup> {
    public id: string;
    public code: string;
    public title: string;
    public areas?: Specialty[] | undefined;

    constructor(other?: ISpecialtyGroup) {
        this.id = (other && other.id) ? other.id : "";
        this.code = (other && other.code) ? other.code : "";
        this.title = (other && other.title) ? other.title : "";
        this.areas = new Array();
        if (other && other.areas && this.areas) {
            other.areas.forEach(sa => {
                if (this.areas) {
                    this.areas.push(new Specialty(sa));
                }
            });
            this.areas.sort((a,b) => a.compareTo(b))
        }
    }

    public compareTo(other: SpecialtyGroup): number {
        if (other.title.toLowerCase() === this.title.toLowerCase()) {
            return 0;
        }
        return (this.title.toLowerCase() < other.title.toLowerCase()) ? -1 : 1;
    }
}

export enum SpecialtyLevels {
    NONE,
    INTRAINING,
    QUALIFIED,
    EXPERT
}