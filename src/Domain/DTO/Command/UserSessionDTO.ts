export class UserSessionDTO
{
    public readonly uuid: string;
    public readonly email: string;
    public readonly password: string;
    public readonly lastLogin: Date;

    constructor(uuid: string, email: string, password: string, lastlogin: Date)
    {
        this.uuid = uuid;
        this.email = email;
        this.password = password;
        this.lastLogin = lastlogin;
    }
}