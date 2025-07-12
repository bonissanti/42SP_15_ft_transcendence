import {BaseValidator} from "./BaseValidator.js";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {DeleteTournamentCommand} from "../CommandObject/DeleteTournamentCommand";

export class DeleteUserCommandValidator implements BaseValidator<DeleteTournamentCommand>
{
    constructor(private tournamentRepository: TournamentRepository, private NotificationError: NotificationError)
    {
    }

    public async Validator(command: DeleteTournamentCommand)
    {
        if (!await this.tournamentRepository.VerifyIfTournamentExistsByUUID(command.tournamentUuid))
            this.NotificationError.AddError(ErrorCatalog.UserNotFound);
    }
}