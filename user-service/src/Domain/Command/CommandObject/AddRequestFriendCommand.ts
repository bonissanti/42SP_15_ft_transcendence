import {AddRequestFriendDTO} from "../../../Application/DTO/ToCommand/AddRequestFriendDTO.js";
import {StatusRequest} from "../../../Application/Enums/StatusRequest.js";

export class AddRequestFriendCommand
{
    public readonly status: StatusRequest;
    public readonly receiverUuid: string;
    public readonly senderUuid: string;

    constructor (status: StatusRequest, receiverUuid: string, senderUuid: string)
    {
        this.status = status;
        this.receiverUuid = receiverUuid;
        this.senderUuid = senderUuid;
    }

    public static fromDTO(dto: AddRequestFriendDTO): AddRequestFriendCommand
    {
        return new AddRequestFriendCommand(dto.status, dto.receiverUuid, dto.senderUuid);
    }
}