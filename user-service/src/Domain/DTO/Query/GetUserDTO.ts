import {GetUserViewModel} from "../../../Presentation/ViewModels/GetUserViewModel.js";

export class GetUserDTO
{
    public readonly uuid: string;
    public readonly email?: string;
    public readonly username?: string;
    public readonly profilePic: string | null;
    public readonly matchesPlayed: number;
    public readonly wins: number;
    public readonly loses: number;
    public readonly isOnline: boolean;
    public readonly lastLogin: Date | null;

    constructor(uuid: string, email: string, username: string, profilepic: string | null = null, matchesPlayed : number, wins : number, loses : number, isOnline: boolean, lastLogin: Date | null)
    {
        this.uuid = uuid;
        this.email = email;
        this.username = username;
        this.profilePic = profilepic;
        this.matchesPlayed = matchesPlayed;
        this.wins = wins;
        this.loses = loses;
        this.isOnline = isOnline;
        this.lastLogin = lastLogin;
    }
}