import {DeleteFriendDTO} from "../../../Application/DTO/ToCommand/DeleteFriendDTO.js";

export class DeleteFriendCommand
{
    constructor(public readonly friendshipUuid: string){}

    public static fromDTO(dto: DeleteFriendDTO): DeleteFriendCommand
    {
        return new DeleteFriendCommand(dto.friendshipUuid);
    }
}