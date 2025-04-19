import {CreateUserCommand} from "../../../Application/Command/CommandObject/CreateUserCommand";

export class CreateUserDTO
{
    public readonly Email: string;
    public readonly Password: string;
    public readonly Username: string;
    public readonly ProfilePic: string | null;

    constructor(email: string, password: string, username: string, profilepic: string | null = null)
    {
        this.Email = email;
        this.Password = password;
        this.Username = username;
        this.ProfilePic = profilepic;
    }
}