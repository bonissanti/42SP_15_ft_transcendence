import {BaseEntity} from "../Interface/BaseEntity.js";
import {PasswordHashVO} from "../../ValueObjects/PasswordHashVO.js";
import {EmailVO} from "../../ValueObjects/EmailVO.js";

export class User implements BaseEntity
{
    public readonly Uuid: string;
    public Email: EmailVO;
    public PasswordHash: PasswordHashVO;
    public Auth0Id: string | null = null;
    public Username: string;
    public ProfilePic: string | null = null ;
    public LastLogin: Date | null = null;
    public isOnline: boolean = false;

    constructor(email: EmailVO,
                passwordHash: PasswordHashVO,
                username: string,
                profilepic: string | null,
                lastlogin: Date | null)
    {
        this.Uuid = crypto.randomUUID();
        this.Email = email;
        this.PasswordHash = passwordHash;
        this.Username = username;
        this.ProfilePic = profilepic;
        this.LastLogin = lastlogin;
    }

    public ChangeEmail(email: EmailVO): void
    {
        if (email.getEmail() != this.Email.getEmail())
            this.Email = email;
    }

    public ChangePassword(passwordHash: PasswordHashVO): void
    {
        if (passwordHash.getPasswordHash() != this.PasswordHash.getPasswordHash())
            this.PasswordHash = passwordHash;
    }

    public ChangeUsername(username: string): void
    {
        if (username != this.Username)
            this.Username = username;
    }

    public ChangePhoto(profilepic: string | null): void
    {
        if (profilepic != this.ProfilePic)
            this.ProfilePic = profilepic;
    }

    public ChangeAuth0Id(auth0id: string): void
    {
        if (auth0id != this.Auth0Id)
            this.Auth0Id = auth0id;
    }

    //TODO: atualizar o model para adicionar isOnline e Auth0Id no User
    public ChangeStatusOnline(isOnline: boolean): void
    {
        if (isOnline != this.isOnline)
            this.isOnline = isOnline;
    }
}