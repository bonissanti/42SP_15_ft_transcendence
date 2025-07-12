import {BaseValidator} from "../../Command/Validators/BaseValidator.js";
import {GetUserQuery} from "../QueryObject/GetUserQuery.js";
import {DeleteUserCommand} from "../../Command/CommandObject/DeleteUserCommand.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";

export class GetUserQueryValidator implements BaseValidator<GetUserQuery>
{
    constructor(private UserRepository: TournamentRepository, private NotificationError: NotificationError)
    {
    }

    public Validator(command: DeleteUserCommand)
    {
        if (!this.UserRepository.VerifyIfUserExistsByUUID(command.Uuid))
            this.NotificationError.AddError(ErrorCatalog.UserNotFound);
    }
}