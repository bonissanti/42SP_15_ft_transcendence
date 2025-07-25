import {StatusRequest} from "../../Application/Enums/StatusRequest.js";

export class GetFriendshipListQueryDTO
{
    public readonly uuid: string;
    public readonly status: StatusRequest;
    public readonly friendUuid: string;
    public readonly friendUsername: string;
    public readonly friendProfilePic: string | null;
    public readonly wins: number;
    public readonly loses: number;
    public readonly matchesPlayed: number;

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