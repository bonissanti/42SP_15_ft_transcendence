import {AddRequestFriendDTO} from "../../../Application/DTO/ToCommand/AddRequestFriendDTO.js";
import {StatusRequestEnum} from "../../../Application/Enums/StatusRequestEnum.js";

export class AddRequestFriendCommand
{
    public readonly status: StatusRequestEnum;
    public readonly receiverUuid: string;
    public readonly senderUuid: string;

    constructor (status: StatusRequestEnum, receiverUuid: string, senderUuid: string)
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