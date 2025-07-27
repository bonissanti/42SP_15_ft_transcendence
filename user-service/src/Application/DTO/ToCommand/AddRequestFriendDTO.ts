import {StatusRequestEnum} from "../../Enums/StatusRequestEnum.js";

export class AddRequestFriendDTO
{
    public readonly status: StatusRequestEnum;
    public readonly receiverUuid: string;
    public readonly senderUuid: string;

    constructor (receiverUuid: string, senderUuid: string)
    {
        this.status = StatusRequestEnum.PENDING;
        this.receiverUuid = receiverUuid;
        this.senderUuid = senderUuid;
    }
}