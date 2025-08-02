import {StatusRequestEnum} from "../../Application/Enums/StatusRequestEnum.js";

export class GetFriendshipListQueryDTO
{
    public readonly uuid: string;
    public readonly status: StatusRequestEnum;
    public readonly friendUuid: string;
    public readonly friendUsername: string;
    public readonly friendProfilePic: string | null;
    public readonly wins: number;
    public readonly loses: number;
    public readonly matchesPlayed: number;
    public readonly senderUuid: string;
    public readonly receiverUuid: string;
    public readonly isOnline: boolean;

    constructor(
        uuid: string,
        status: StatusRequestEnum,
        friendUuid: string,
        friendUsername: string,
        friendProfilePic: string | null,
        wins: number,
        loses: number,
        matchesPlayed: number,
        senderUuid: string,
        receiverUuid: string,
        isOnline: boolean
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
        this.senderUuid = senderUuid;
        this.receiverUuid = receiverUuid;
        this.isOnline = isOnline;
    }
}