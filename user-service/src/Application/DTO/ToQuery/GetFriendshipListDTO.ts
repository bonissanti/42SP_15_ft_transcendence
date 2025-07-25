import {StatusRequestEnum} from "../../Enums/StatusRequestEnum.js";

export class GetFriendshipListDTO
{
    public readonly userUuid: string;
    public readonly status: StatusRequestEnum;

    constructor(uuid: string, status: StatusRequestEnum)
    {
        this.userUuid = uuid;
        this.status = status;
    }
}