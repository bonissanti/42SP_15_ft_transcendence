export class UserSessionDTO
{
    public readonly email: string;
    public readonly password: string;
    public readonly lastLogin: Date;
    public readonly isOnline: boolean;

    constructor(email: string, password: string, lastlogin: Date, isOnline: boolean)
    {
        this.email = email;
        this.password = password;
        this.lastLogin = lastlogin;
        this.isOnline = isOnline;
    }
}