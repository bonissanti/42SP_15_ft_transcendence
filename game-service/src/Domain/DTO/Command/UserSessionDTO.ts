export class UserSessionDTO
{
    public readonly uuid: string;
    public readonly email: string;
    public readonly password: string;
    public readonly lastLogin: Date;
    public readonly isOnline: boolean;

    constructor(uuid: string, email: string, password: string, lastlogin: Date, isOnline: boolean)
    {
        this.uuid = uuid;
        this.email = email;
        this.password = password;
        this.lastLogin = lastlogin;
        this.isOnline = isOnline;
    }
}