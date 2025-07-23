export class Friendship
{
    public readonly uuid: string;
    public status: StatusRequest;
    public readonly receiverUuid: string;
    public readonly senderUuid: string;
    public readonly createdAt: number;

    constructor (status: StatusRequest, receiverUuid: string, senderUuid: string)
    {
        this.uuid = crypto.randomUUID();
        this.status = status;
        this.receiverUuid = receiverUuid;
        this.senderUuid = senderUuid;
        this.createdAt = Date.now();
    }
}