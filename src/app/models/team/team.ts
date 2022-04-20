import { Permission, PermissionLevel } from "./permission";
import { SpecialtyGroup } from "./specialties";
import { Site } from "../site/site";
import { Company } from "./company";
import { DisplayCode } from "./displaycode";
import { ContactType } from "./contacts";

export interface ITeam {
    id: string;
    code: string;
    name: string;
    companies?: Company[];
    displayCodes?: DisplayCode[] | undefined;
    specialtyGroups?: SpecialtyGroup[] | undefined;
    contactTypes?: ContactType[] | undefined;
    permissions?: Permission[] | undefined;
    sites?: Site[];
    date_created?: Date;
    last_updated?: Date;
}

export class Team implements ITeam  {
    public id: string;
    public code: string;
    public name: string;
    public companies?: Company[];
    public displayCodes?: DisplayCode[] | undefined;
    public specialtyGroups?: SpecialtyGroup[] | undefined;
    public contactTypes?: ContactType[] | undefined;
    public permissions?: Permission[] | undefined;
    public sites?: Site[];
    public date_created?: Date;
    public last_updated?: Date;

    constructor(other?: Team) {
        this.id = (other && other.id) ? other.id : "";
        this.code = (other) ? other.code : "";
        this.name = (other) ? other.name : "";
        this.companies = [];
        if (other && other.companies) {
            for (let com of other.companies) {
                this.companies.push(new Company(com));
            }
        }
        this.displayCodes = [];
        if (other && other.displayCodes) {
            for (let dc of other.displayCodes) {
                this.displayCodes.push(new DisplayCode(dc));
            }
        }
        this.specialtyGroups = [];
        if (other && other.specialtyGroups) {
            for (let sg of other.specialtyGroups) {
                this.specialtyGroups.push(new SpecialtyGroup(sg));
            }
        }
        this.contactTypes = [];
        if (other && other.contactTypes) {
            for (let ct of other.contactTypes) {
                this.contactTypes.push(new ContactType(ct));
            }
        }
        this.permissions = [];
        if (other && other.permissions) {
            for (let perm of other.permissions) {
                this.permissions.push(new Permission(perm));
            }
        }
        this.sites = [];
        if (other && other.sites) {
            for (let site of other.sites) {
                this.sites.push(new Site(site));
            }
        }
        this.date_created = (other && other.date_created)
            ? new Date(other.date_created) : new Date(0);
        this.last_updated = (other && other.last_updated) 
            ? new Date(other.last_updated) : new Date(0);
    }
}