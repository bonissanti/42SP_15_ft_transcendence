import {GetUserDTO} from "../../../Domain/DTO/Query/GetUserDTO.js";

export class GetUserQuery
{
    public readonly Uuid: string;
    public readonly Email?: string | null;
    public readonly Username?: string | null;
    public readonly ProfilePic: string | null;

    constructor(uuid: string, email?: string | null, username?: string | null, profilepic: string | null = null)
    {
        this.Uuid = uuid;
        this.Email = email;
        this.Username = username;
        this.ProfilePic = profilepic;
    }

    public static FromDTO(dto: GetUserDTO): GetUserQuery
    {
        return new GetUserQuery(dto.uuid, dto.email, dto.username);
    }

}