import {BaseEntity} from "../Interface/BaseEntity.js";
import {EmailVO} from "../../ValueObjects/EmailVO.js";

export class UserAuth0 implements BaseEntity
{
    public readonly Uuid: string;
    public readonly Email: EmailVO;
    public readonly Auth0Id: string;
    public readonly ProfilePic: string | null;

    constructor(email: EmailVO, auth0id: string, profilepic: string | null = null)
    {
        this.Uuid = crypto.randomUUID();
        this.Email = email;
        this.Auth0Id = auth0id;
        this.ProfilePic = profilepic;
    }
}