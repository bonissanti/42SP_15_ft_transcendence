import {UserCommand} from "../../../Application/Command/CommandObject/UserCommand";

export class UserDTO
{
    public readonly Email: string;
    public readonly Password: string;
    public readonly Username: string;

    constructor(email: string, password: string, username: string)
    {
        this.Email = email;
        this.Password = password;
        this.Username = username;
    }
}