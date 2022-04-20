import { IEmployee } from "../employee/employee";
import { ISite } from "../site/site";
import { ITeam } from "../team/team";

export interface LoginResponse {
    team: ITeam;
    site: ISite;
    user: IEmployee;
    mustchange: boolean;
    token: string;
}

export interface Message {
    message: string;
}

export interface NewEmployeeResponse {
    employee: IEmployee
}