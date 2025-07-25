import {StatusRequest} from "../../Enums/StatusRequest.js";

export class ChangeRequestFriendStatusDTO
{
    public readonly friendshipUuid: string;
    public readonly status: StatusRequest;

    constructor (friendshipUuid: string, status: StatusRequest)
    {
        this.friendshipUuid = friendshipUuid;
        this.status = status;
    }
}