import {BaseValidator} from "../../Command/Validators/BaseValidator.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {GetTournamentQuery} from "../QueryObject/GetTournamentQuery";
import {DeleteTournamentCommand} from "../../Command/CommandObject/DeleteTournamentCommand";

export class GetUserQueryValidator implements BaseValidator<GetTournamentQuery>
{
    constructor(private UserRepository: TournamentRepository, private NotificationError: NotificationError)
    {
    }

    public Validator(command: DeleteTournamentCommand)
    {
        if (!this.UserRepository.VerifyIfTournamentExistsByUUID(command.tournamentUuid))
            this.NotificationError.AddError(ErrorCatalog.UserNotFound);
    }
}