import {ChangeRequestFriendStatusDTO} from "../../../Application/DTO/ToCommand/ChangeRequestFriendStatusDTO.js";
import {StatusRequestEnum} from "../../../Application/Enums/StatusRequestEnum.js";

export class ChangeRequestFriendStatusCommand
{
    public readonly friendshipUuid: string;
    public readonly status: StatusRequestEnum;

    constructor (friendshipUuid: string, status: StatusRequestEnum)
    {
        this.friendshipUuid = friendshipUuid;
        this.status = status;
    }

    public static fromDTO(dto: ChangeRequestFriendStatusDTO): ChangeRequestFriendStatusCommand
    {
        return new ChangeRequestFriendStatusCommand(dto.friendshipUuid, dto.status);
    }
}