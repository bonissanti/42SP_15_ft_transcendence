import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {BaseValidator} from "./BaseValidator";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog";
import {ValidationException} from "../../../Shared/Errors/ValidationException";
import {CustomError} from "../../../Shared/Errors/CustomError";
import {CreateTournamentCommand} from "../CommandObject/CreateTournamentCommand";
import {BackendApiClient} from "../../../Infrastructure/Http/Concrete/BackendApiClient";

export class CreateTournamentValidator implements BaseValidator<CreateTournamentCommand>
{
    private tournamentRepository: TournamentRepository;
    private NotificationError: NotificationError;
    private backendApiClient: BackendApiClient

    constructor(userRepository: TournamentRepository, notificationError: NotificationError)
    {
        this.tournamentRepository = userRepository;
        this.NotificationError = notificationError;
        this.backendApiClient = new BackendApiClient();
    }

    public async Validator(command: CreateTournamentCommand): Promise<void>
    {
        await this.validateUsersExists(command);

        if (this.NotificationError.NumberOfErrors() > 0){
            const allErrors: CustomError[] = this.NotificationError.GetAllErrors();
            throw new ValidationException(allErrors);
        }
    }

    private async validateUsersExists(command: CreateTournamentCommand)
    {
        try
        {
            const usersList: string[] = [
                command.player1Username,
                command.player2Username,
                command.player3Username,
                command.player4Username,
            ].filter(uuid => uuid != null && uuid !== '');

            if (usersList.length < 4)
                this.NotificationError.AddError(ErrorCatalog.InvalidNumberOfParticipants);
            console.log("Verifying if users exist with usernames:", usersList);
            const exists: boolean = await this.backendApiClient.VerifyIfUsersExistsByUsername(usersList);

            if (!exists)
                this.NotificationError.AddError(ErrorCatalog.UserNotFound);
        }
        catch (error)
        {
            this.NotificationError.AddError(ErrorCatalog.InternalBackendApiErrorVerifyIfUsersExists);
        }
    }
}