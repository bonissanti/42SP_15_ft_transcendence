import {BaseEntity} from "../Interface/BaseEntity";
import {IUser} from "../Interface/IUser";

export class User implements BaseEntity, IUser
{
    public readonly Uuid: string;
    public readonly Email: string;
    public readonly PasswordHash: string;
    public readonly Username: string;

    constructor(email: string, passwordHash: string, username: string)
    {
        this.Uuid = crypto.randomUUID();
        this.Email = email;
        this.PasswordHash = passwordHash;
        this.Username = username;
    }
}