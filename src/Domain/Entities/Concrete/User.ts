import {BaseEntity} from "../Interface/BaseEntity";
import {IUser} from "../Interface/IUser";
import {PasswordHashVO} from "../../ValueObjects/PasswordHashVO";

export class User implements BaseEntity, IUser
{
    public readonly Uuid: string;
    public readonly Email: string;
    public readonly PasswordHash: PasswordHashVO;
    public readonly Username: string;

    constructor(email: string, passwordHash: PasswordHashVO, username: string)
    {
        this.Uuid = crypto.randomUUID();
        this.Email = email;
        this.PasswordHash = passwordHash;
        this.Username = username;
    }
}