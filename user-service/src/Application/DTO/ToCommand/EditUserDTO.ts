export class EditUserDTO
{
    public readonly uuid: string;
    public readonly email: string;
    public readonly password?: string | null;
    public readonly username?: string | null;
    public readonly anonymous: boolean = false;
    public readonly profilePic: string | null;

    constructor(_uuid: string, _email: string, _password: string | null | undefined, _username: string | null | undefined, _anonymous: boolean, _profilepic: string | null)
    {
        this.uuid = _uuid;
        this.email = _email;
        this.password = _password;
        this.username = _username;
        this.anonymous = _anonymous;
        this.profilePic = _profilepic;
    }
}