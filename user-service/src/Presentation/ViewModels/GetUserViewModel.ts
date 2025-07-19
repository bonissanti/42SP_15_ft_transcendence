import {GetUserQueryDTO} from "../../Domain/QueryDTO/GetUserQueryDTO.js";

export class GetUserViewModel
{
    public readonly Uuid: string | null;
    public readonly Username: string | null;
    public readonly Email: string | null;
    public readonly ProfilePic: string | null;
    public readonly matchesPlayed: number | null;
    public readonly wins: number | null;
    public readonly loses: number | null;


    constructor(uuid?: string, username?: string, email?: string, profilepic: string | null = null, matchesPlayed? : number | null, wins? : number | null, loses? : number | null)
    {
        this.Uuid = uuid ?? null;
        this.Username = username ?? null;
        this.Email = email ?? null;
        this.ProfilePic = profilepic;
        this.matchesPlayed = matchesPlayed ?? null;
        this.wins = wins ?? null;
        this.loses = loses ?? null;
    }

    public static FromQueryDTO(query: GetUserQueryDTO | null): GetUserViewModel
    {
        return new GetUserViewModel(query?.Uuid, query?.Username, query?.Email, query?.ProfilePic, query?.matchesPlayed, query?.wins, query?.loses);
    }
}