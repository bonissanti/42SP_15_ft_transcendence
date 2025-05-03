export class CreateUserDTO
{
    public readonly email: string;
    public readonly password: string;
    public readonly username: string;
    public readonly profilePic: string | null;
    public readonly lastLogin: string | null = null;

    constructor(_email: string, _password: string, _username: string, _profilepic: string | null = null, _lastlogin: string | null)
    {
        this.email = _email;
        this.password = _password;
        this.username = _username;
        this.profilePic = _profilepic;
        this.lastLogin = _lastlogin;
    }
}