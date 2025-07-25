import {StatusRequest} from "../../Enums/StatusRequest.js";

export class AddRequestFriendDTO
{
    public readonly status: StatusRequest;
    public readonly receiverUuid: string;
    public readonly senderUuid: string;

    constructor (receiverUuid: string, senderUuid: string)
    {
        this.status = StatusRequest.PENDING;
        this.receiverUuid = receiverUuid;
        this.senderUuid = senderUuid;
    }
}