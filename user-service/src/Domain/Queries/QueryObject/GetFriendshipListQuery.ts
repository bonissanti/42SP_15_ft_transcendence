import {StatusRequest} from "../../../Application/Enums/StatusRequest.js";

export class GetFriendshipListQuery
{
    public readonly uuid: string;
    public readonly status: StatusRequest;

    constructor(uuid: string, status: StatusRequest)
    {
        this.uuid = uuid;
        this.status = status;
    }

    public static fromQuery(query: GetFriendshipListQuery): GetFriendshipListQuery
    {
        return new GetFriendshipListQuery(query.uuid, query.status);
    }
}