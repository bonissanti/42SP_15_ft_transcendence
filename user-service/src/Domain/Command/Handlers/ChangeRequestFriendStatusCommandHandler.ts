import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {ChangeRequestFriendStatusCommand} from "../CommandObject/ChangeRequestFriendStatusCommand.js";
import {Friendship} from "../../Entities/Concrete/Friendship.js";

export class ChangeRequestFriendStatusCommandHandler implements BaseHandlerCommand<ChangeRequestFriendStatusCommand>
{
    private FriendshipRepository: FriendshipRepository;

    constructor(friendshipRepository: FriendshipRepository, notification: notificationError)
    {
        this.FriendshipRepository = friendshipRepository;
    }

    async Handle(command: ChangeRequestFriendStatusCommand): Promise<void>
    {
        const friendship: Friendship = this.FriendshipRepository.GetByFriendshipUuid(command.friendshipUuid);

        friendship.status = command.status;

        this.FriendshipRepository.update(friendship);
    }
}