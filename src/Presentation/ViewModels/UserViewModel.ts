import {UserQueryDTO} from "../../Domain/DTO/Query/UserQueryDTO.js";

export class UserViewModel
{
    public readonly Uuid: string | null;
    public readonly Username: string | null;
    public readonly Email: string | null;
    public readonly ProfilePic: string | null;

    constructor(uuid?: string, username?: string, email?: string, profilepic: string | null = null)
    {
        this.Uuid = uuid ?? null;
        this.Username = username ?? null;
        this.Email = email ?? null;
        this.ProfilePic = profilepic;
    }

    public static FromQueryDTO(query: UserQueryDTO | null): UserViewModel
    {
        return new UserViewModel(query?.Uuid, query?.Username, query?.Email, query?.ProfilePic);
    }
}