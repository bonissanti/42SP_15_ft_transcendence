import {GetUserQueryDTO} from "../../Domain/QueryDTO/GetUserQueryDTO.js";

export class GetUserViewModel
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

    public static FromQueryDTO(query: GetUserQueryDTO | null): GetUserViewModel
    {
        return new GetUserViewModel(query?.Uuid, query?.Username, query?.Email, query?.ProfilePic);
    }
}