import {GetUserViewModel} from "../../ViewModels/GetUserViewModel.js";

export class GetUserDTO
{
    public readonly uuid: string;
    public readonly email?: string | null; // TODO: checar se é possivel buscar usuario usando email
    public readonly username?: string | null;
    public readonly profilePic?: string | null;
    public readonly matchesPlayed?: number;
    public readonly wins?: number;
    public readonly loses?: number;
    public readonly isOnline?: boolean;
    public readonly lastLogin?: Date | null;

    constructor(
        uuid: string,
        email?: string | null,
        username?: string | null,
        profilepic?: string | null,
        matchesPlayed?: number,
        wins?: number,
        loses?: number,
        isOnline?: boolean,
        lastLogin?: Date | null
    )
    {
        this.uuid = uuid;
        this.email = email; // TODO: no validator do create/edit, verificar se o email ja existe, manter um só
        this.username = username;
        this.profilePic = profilepic;
        this.matchesPlayed = matchesPlayed;
        this.wins = wins;
        this.loses = loses;
        this.isOnline = isOnline;
        this.lastLogin = lastLogin;
    }
}