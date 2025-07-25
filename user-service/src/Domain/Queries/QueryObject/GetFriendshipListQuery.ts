import {StatusRequestEnum} from "../../../Application/Enums/StatusRequestEnum.js";
import {GetFriendshipListDTO} from "../../../Application/DTO/ToQuery/GetFriendshipListDTO.js";

export class GetFriendshipListQuery
{
    public readonly uuid: string;
    public readonly status: StatusRequestEnum;

    constructor(uuid: string, status: StatusRequestEnum)
    {
        this.uuid = uuid;
        this.status = status;
    }

    public static fromQuery(dto: GetFriendshipListDTO): GetFriendshipListQuery
    {
        return new GetFriendshipListQuery(dto.userUuid, dto.status);
    }
}