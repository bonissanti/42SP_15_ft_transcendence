import {StatusRequestEnum} from "../../Enums/StatusRequestEnum.js";

export class ChangeRequestFriendStatusDTO
{
    public readonly friendshipUuid: string;
    public readonly status: StatusRequestEnum;

    constructor (friendshipUuid: string, status: StatusRequestEnum)
    {
        this.friendshipUuid = friendshipUuid;
        this.status = status;
    }
}