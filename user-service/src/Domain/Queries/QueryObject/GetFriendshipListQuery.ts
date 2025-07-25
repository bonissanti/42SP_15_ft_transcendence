import {StatusRequest} from "../../../Application/Enums/StatusRequest.js";
import {GetFriendshipListDTO} from "../../../Application/DTO/ToQuery/GetFriendshipListDTO.js";

export class GetFriendshipListQuery
{
    public readonly uuid: string;
    public readonly status: StatusRequest;

    constructor(uuid: string, status: StatusRequest)
    {
        this.uuid = uuid;
        this.status = status;
    }

    public static fromQuery(dto: GetFriendshipListDTO): GetFriendshipListQuery
    {
        return new GetFriendshipListQuery(dto.userUuid, dto.status);
    }
}