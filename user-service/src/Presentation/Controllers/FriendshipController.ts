import {NotificationError} from "../../Shared/Errors/NotificationError.js";
import {AddRequestFriendDTO} from "../../Application/DTO/ToCommand/AddRequestFriendDTO.js";
import {Result} from "../../Shared/Utils/Result.js";
import {ChangeRequestFriendStatusDTO} from "../../Application/DTO/ToCommand/ChangeRequestFriendStatusDTO.js";

export class FriendshipController extends BaseController
{
    private readonly notificationError: NotificationError;

    constructor()
    {
        super();
    }

    private async AddFriend(request: FastifyRequest<{ Body: AddRequestFriendDTO }>, reply: FastifyReply): Promise<Result>
    {
        const body = request.body;
        const friendDTO: AddRequestFriendDTO = new AddRequestFriendDTO(body.status, body.receiverUuid, body.senderUuid);
        const result: Result = await this.friendship.AddFriendService(friendDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }

    private async ChangeStatusRequestFriend(request: FastifyRequest<{ Body: ChangeRequestFriendStatusDTO}>, reply: FastifyReply): Promise<Result>
    {
        const body = request.body;
        const friendDTO: ChangeRequestFriendStatusDTO = new ChangeRequestFriendStatusDTO(body.uuid, body.status);
        const result: Result = await this.friendship.ChangeStatusService(friendDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }

    private async ListFriendshipStatus(request: FastifyRequest<{ Body: ListFriendshipDTO}>, reply: FastifyReply): Promise<Result>
    {
        const body = request.body;
        const friendDTO: ListFriendshipDTO = new ListFriendshipDTO(body.userUuid, body.status);
        const result: Result = await this.friendship.ListFriendService(friendDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
}