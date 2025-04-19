import {BaseEntity} from "../Interface/BaseEntity";
import {PasswordHashVO} from "../../ValueObjects/PasswordHashVO";
import {EmailVO} from "../../ValueObjects/EmailVO";

export class User implements BaseEntity
{
    public readonly Uuid: string;
    public readonly Email: EmailVO;
    public readonly PasswordHash: PasswordHashVO;
    public readonly Username: string;
    public readonly ProfilePic: string | null;

    constructor(email: EmailVO, passwordHash: PasswordHashVO, username: string, profilepic: string | null = null)
    {
        this.Uuid = crypto.randomUUID();
        this.Email = email;
        this.PasswordHash = passwordHash;
        this.Username = username;
        this.ProfilePic = profilepic;
    }
}