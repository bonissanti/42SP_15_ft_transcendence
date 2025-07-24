import {StatusRequest} from "../../Application/Enums/StatusRequest.js";

export class GetFriendshipListQueryDTO
{
    private uuid: string;
    private status: StatusRequest;
    private friendUuid: string;
    private friendUsername: string;
    private friendProfilePic: string | null;
    private wins: number;
    private loses: number;
    private matchesPlayed: number;

    constructor(
        uuid: string,
        status: StatusRequest,
        friendUuid: string,
        friendUsername: string,
        friendProfilePic: string | null,
        wins: number,
        loses: number,
        matchesPlayed: number
    )
    {
        this.uuid = uuid;
        this.status = status;
        this.friendUuid = friendUuid;
        this.friendUsername = friendUsername;
        this.friendProfilePic = friendProfilePic;
        this.wins = wins;
        this.loses = loses;
        this.matchesPlayed = matchesPlayed;
    }
}