import {BaseValidator} from "../../Command/Validators/BaseValidator";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
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