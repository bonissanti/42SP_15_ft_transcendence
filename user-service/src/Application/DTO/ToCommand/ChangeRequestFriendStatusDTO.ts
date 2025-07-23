export class ChangeRequestFriendStatusDTO
{
    public readonly uuid: string;
    public readonly status: StatusRequest;

    constructor (uuid: string, status: StatusRequest)
    {
        this.uuid = uuid;
        this.status = status;
    }
}