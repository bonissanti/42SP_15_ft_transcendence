import {NotificationError} from "../../Shared/Errors/NotificationError.js";
import {AddRequestFriendDTO} from "../../Application/DTO/ToCommand/AddRequestFriendDTO.js";
import {Result} from "../../Shared/Utils/Result.js";
import {ChangeRequestFriendStatusDTO} from "../../Application/DTO/ToCommand/ChangeRequestFriendStatusDTO.js";
import {BaseController} from "./BaseController.js";
import {GetFriendshipListDTO} from "../../Application/DTO/ToQuery/GetFriendshipListDTO.js";
import {FriendshipService} from "../../Application/Services/Concrete/FriendshipService.js";
import {GetFriendshipListViewModel} from "../../Application/ViewModels/GetFriendshipListViewModel.js";
import {UserRepository} from "../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {FriendshipRepository} from "../../Infrastructure/Persistence/Repositories/Concrete/FriendshipRepository.js";
import {FastifyReply, FastifyRequest} from "fastify";
import {DeleteFriendDTO} from "../../Application/DTO/ToCommand/DeleteFriendDTO.js";

export class FriendshipController extends BaseController
{
    private readonly notificationError: NotificationError;
    private readonly friendshipService: FriendshipService;

    constructor(friendshipRepository: FriendshipRepository, userRepository: UserRepository)
    {
        super();
        this.notificationError = new NotificationError();
        this.friendshipService = new FriendshipService(friendshipRepository, userRepository, this.notificationError);
    }

    public async AddFriend(request: FastifyRequest<{ Body: AddRequestFriendDTO }>, reply: FastifyReply): Promise<Result>
    {
        const body = request.body;
        const friendDTO: AddRequestFriendDTO = new AddRequestFriendDTO(body.receiverUuid, body.senderUuid);
        const result: Result = await this.friendshipService.AddFriendService(friendDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }

    public async ChangeStatusRequestFriend(request: FastifyRequest<{ Body: ChangeRequestFriendStatusDTO}>, reply: FastifyReply): Promise<Result>
    {
        const body = request.body;
        console.log("Passou do body");
        const friendDTO: ChangeRequestFriendStatusDTO = new ChangeRequestFriendStatusDTO(body.friendshipUuid, body.status);
        console.log("Passou do friend DTO");
        const result: Result = await this.friendshipService.ChangeStatusService(friendDTO, reply);
        console.log("Passou do Result");
        return this.handleResult(result, reply, this.notificationError);
        
    }

    public async FriendshipStatusList(request: FastifyRequest<{ Querystring: GetFriendshipListDTO }>, reply: FastifyReply): Promise<Result<GetFriendshipListViewModel[]>>
    {
        const query = request.query;
        const friendDTO: GetFriendshipListDTO = new GetFriendshipListDTO(query.userUuid, query.status);
        const result: Result<GetFriendshipListViewModel[]> = await this.friendshipService.ListFriendService(friendDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }

    public async DeleteFriend(request: FastifyRequest<{ Body: DeleteFriendDTO }>, reply: FastifyReply): Promise<Result>
    {
        const body = request.body;
        const friendDTO = new DeleteFriendDTO(body.friendshipUuid);
        const result: Result = await this.friendshipService.DeleteFriendService(friendDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
}