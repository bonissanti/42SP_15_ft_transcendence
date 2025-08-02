import {StatusRequestEnum} from "../Enums/StatusRequestEnum.js";
import {GetFriendshipListQueryDTO} from "../../Domain/QueryDTO/GetFriendshipListQueryDTO.js";

export class GetFriendshipListViewModel {
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
    ) {
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

    public static fromQueryDTO(queryDTO: GetFriendshipListQueryDTO[]): GetFriendshipListViewModel[]
    {
        return queryDTO.map(friends => new GetFriendshipListViewModel(
            friends.uuid,
            friends.status,
            friends.friendUuid,
            friends.friendUsername,
            friends.friendProfilePic,
            friends.wins,
            friends.loses,
            friends.matchesPlayed,
            friends.senderUuid,
            friends.receiverUuid,
            friends.isOnline
        ));
    }
}