import {BaseValidator} from "./BaseValidator.js";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {DeleteUserCommand} from "../CommandObject/DeleteUserCommand.js";

export class DeleteUserCommandValidator implements BaseValidator<DeleteUserCommand>
{
    constructor(private UserRepository: TournamentRepository, private NotificationError: NotificationError)
    {
    }

    public async Validator(command: DeleteUserCommand)
    {
        if (!await this.UserRepository.VerifyIfUserExistsByUUID(command.Uuid))
            this.NotificationError.AddError(ErrorCatalog.UserNotFound);
    }
}