import {StatusRequest} from "../../Enums/StatusRequest.js";

export class GetFriendshipListDTO
{
    public readonly userUuid: string;
    public readonly status: StatusRequest;

    constructor(uuid: string, status: StatusRequest)
    {
        this.userUuid = uuid;
        this.status = status;
    }
}