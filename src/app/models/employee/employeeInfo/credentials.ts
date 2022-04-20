export interface ICredentials {
    expires: Date;
    must_change: boolean;
    locked: boolean;
}

export class Credentials implements ICredentials {
    public expires: Date;
    public must_change: boolean;
    public locked: boolean;

    constructor(creds?: ICredentials) {
        this.expires = (creds) ? creds.expires : new Date();
        this.must_change = (creds) ? creds.must_change : false;
        this.locked = (creds) ? creds.locked : false;
    }
}