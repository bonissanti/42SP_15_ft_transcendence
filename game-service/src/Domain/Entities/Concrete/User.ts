import {BaseEntity} from "../Interface/BaseEntity.js";
import {PasswordHashVO} from "../../ValueObjects/PasswordHashVO.js";
import {EmailVO} from "../../ValueObjects/EmailVO.js";
import crypto from 'crypto'

export class User implements BaseEntity
{
    public Uuid: string;
    public Email: EmailVO;
    public PasswordHash: PasswordHashVO;
    public Auth0Id: string | null = null;
    public Username: string;
    public ProfilePic: string | null = null ;
    public LastLogin: Date | null = null;
    public isOnline: boolean = false;
    public matchesPlayed: number;
    public wins: number;
    public loses: number;

    constructor(
        email: EmailVO,
        passwordHash: PasswordHashVO,
        username: string,
        profilepic: string | null,
        lastlogin: Date | null,
        matchesPlayed: number,
        wins: number,
        loses: number
    ) {
        this.Uuid = crypto.randomUUID();
        console.log("User.Uuid", this.Uuid);
        this.Email = email;
        this.PasswordHash = passwordHash;
        this.Username = username;
        this.ProfilePic = profilepic;
        this.LastLogin = lastlogin;
        this.matchesPlayed = matchesPlayed;
        this.wins = wins;
        this.loses = loses;
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

    public ChangeStatusOnline(isOnline: boolean): void
    {
        if (isOnline != this.isOnline)
            this.isOnline = isOnline;

        this.LastLogin = new Date();
    }
}