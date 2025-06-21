export class EditUserDTO
{
    public readonly uuid: string;
    public readonly email: string;
    public readonly password: string;
    public readonly username: string;
    public readonly profilePic: string | null;

    constructor(_uuid: string, _email: string, _password: string, _username: string, _profilepic: string | null = null)
    {
        this.uuid = _uuid;
        this.email = _email;
        this.password = _password;
        this.username = _username;
        this.profilePic = _profilepic;
    }
}