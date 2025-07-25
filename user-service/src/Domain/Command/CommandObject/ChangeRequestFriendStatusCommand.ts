import {ChangeRequestFriendStatusDTO} from "../../../Application/DTO/ToCommand/ChangeRequestFriendStatusDTO.js";
import {StatusRequest} from "../../../Application/Enums/StatusRequest.js";

export class ChangeRequestFriendStatusCommand
{
    public readonly friendshipUuid: string;
    public readonly status: StatusRequest;

    constructor (friendshipUuid: string, status: StatusRequest)
    {
        this.friendshipUuid = friendshipUuid;
        this.status = status;
    }

    public static fromDTO(dto: ChangeRequestFriendStatusDTO): ChangeRequestFriendStatusCommand
    {
        return new ChangeRequestFriendStatusCommand(dto.friendshipUuid, dto.status);
    }
}