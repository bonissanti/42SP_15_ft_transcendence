import {StatusRequestEnum} from "../../../Application/Enums/StatusRequestEnum.js";
import * as crypto from "crypto";

export class Friendship
{
    public uuid: string;
    public status: StatusRequestEnum;
    public receiverUuid: string;
    public senderUuid: string;
    public createdAt: number;

    constructor (status: StatusRequestEnum, receiverUuid: string, senderUuid: string)
    {
        this.uuid = crypto.randomUUID();
        this.status = status;
        this.receiverUuid = receiverUuid;
        this.senderUuid = senderUuid;
        this.createdAt = Date.now();
    }

    public static fromDatabase(uuid: string, status: StatusRequestEnum, receiverUuid: string, senderUuid: string, createdAt: Date): Friendship
    {
        const friendship = Object.create(Friendship.prototype);
        friendship.uuid = uuid;
        friendship.status = status;
        friendship.receiverUuid = receiverUuid;
        friendship.senderUuid = senderUuid;
        friendship.createdAt = createdAt.getTime();
        return friendship;
    }
}