import {CreateUserCommand} from "../../../Application/Command/CommandObject/CreateUserCommand.js";

export class CreateUserDTO
{
    public readonly email: string;
    public readonly password: string;
    public readonly username: string;
    public readonly profilePic: string | null;

    constructor(_email: string, _password: string, _username: string, _profilepic: string | null = null)
    {
        this.email = _email;
        this.password = _password;
        this.username = _username;
        this.profilePic = _profilepic;
    }
}