import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {DeleteUserCommand} from "../CommandObject/DeleteUserCommand.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";


export class DeleteUserCommandHandler implements BaseHandlerCommand<DeleteUserCommand>
{
    constructor(private UserRepository: TournamentRepository, Notifcation: NotificationError)
    {
    }

    async Handle(command: DeleteUserCommand): Promise<void>
    {
        await this.UserRepository.Delete(command.Uuid);
    }
}