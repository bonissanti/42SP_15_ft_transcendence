export class EditUserDTO
{
    public readonly uuid: string;
    public readonly email: string;
    public readonly password: string;
    public readonly username: string;
    public readonly anonymous: boolean = false;
    public readonly profilePic: string | null;

    constructor(_uuid: string, _email: string, _password: string, _username: string, _anonymous: boolean, _profilepic: string | null)
    {
        this.uuid = _uuid;
        this.email = _email;
        this.password = _password;
        this.username = _username;
        this.anonymous = _anonymous;
        this.profilePic = _profilepic;
    }
}