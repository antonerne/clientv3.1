export enum PermissionLevel {
    employee = 0,
    site,
    team,
    master
}

export interface IPermission {
    id: string;
    title: string;
    level: PermissionLevel;
    read?: boolean | undefined;
    write?: boolean | undefined;
    approver?: boolean | undefined;
    admin?: boolean | undefined;
}

export class Permission {
    public id: string;
    public title: string;
    public level: PermissionLevel;
    public read?: boolean | undefined;
    public write?: boolean | undefined;
    public approver?: boolean | undefined;
    public admin?: boolean | undefined;

    constructor(other?: IPermission) {
        this.id = (other && other.id) ? other.id : "";
        this.title = (other) ? other.title : "";
        this.level = (other) ? other.level : PermissionLevel.site;
        this.read = (other && other.read) ? other.read : false;
        this.write = (other && other.write) ? other.write : false;
        this.approver = (other && other.approver) ? other.approver : false;
        this.admin = (other && other.admin) ? other.admin : false;
    }
}