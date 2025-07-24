import {BaseHandlerQuery} from "./BaseHandlerQuery.js";
import {GetFriendshipListQuery} from "../QueryObject/GetFriendshipListQuery.js";
import {FriendshipRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/FriendshipRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";

export class GetFriendshipListQueryHandler implements BaseHandlerQuery<GetFriendshipListQuery, GetFriendshipListQueryDTO[]>
{
    constructor (private friendshipRepository: FriendshipRepository, notificationError: NotificationError)
    {
    }

    async Handle(query: GetFriendshipListQuery): Promise<GetFriendshipListQueryDTO[]>
    {
        return await this.friendshipRepository.GetFriendshipByUserAndStatus(query.uuid, query.status);
    }
}