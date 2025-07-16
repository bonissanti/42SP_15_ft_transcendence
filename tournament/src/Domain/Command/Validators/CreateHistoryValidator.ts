import {BaseValidator} from "./BaseValidator";
import {CreateHistoryCommand} from "../CommandObject/CreateHistoryCommand";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {BackendApiClient} from "../../../Infrastructure/Http/Concrete/BackendApiClient";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog";
import {CustomError} from "../../../Shared/Errors/CustomError";
import {ValidationException} from "../../../Shared/Errors/ValidationException";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository";

export class CreateHistoryValidator implements BaseValidator<CreateHistoryCommand>
{
    private NotificationError: NotificationError;
    private backendApiClient: BackendApiClient;

    constructor(notificationError: NotificationError)
    {
        this.NotificationError = notificationError;
        this.backendApiClient = new BackendApiClient();
    }

    public async Validator(command: CreateHistoryCommand): Promise<void>
    {
        await this.ValidateUserExists(command);

        if (command.player1Username === command.player2Username)
            this.NotificationError.AddError(ErrorCatalog.PlayerCantPlayAgainstSelf);

        if (command.player1Points < 0 || command.player2Points < 0)
            this.NotificationError.AddError(ErrorCatalog.NegativePoints);

        if (this.NotificationError.NumberOfErrors() > 0){
            const allErrors : CustomError[] = this.NotificationError.GetAllErrors();
            throw new ValidationException(allErrors);
        }
    }

    private async ValidateUserExists(command: CreateHistoryCommand)
    {
        try
        {
            const userList: string[] = [
                command.player1Username,
                command.player2Username
            ].filter(username => username != null && username !== '');

            if (userList.length < 2)
                this.NotificationError.AddError(ErrorCatalog.InvalidNumberOfParticipantsHistory);

            const exists: boolean = await this.backendApiClient.verifyUserExists(userList);

            if (!exists)
                this.NotificationError.AddError(ErrorCatalog.UserNotFound);
        }
        catch (error)
        {
            this.NotificationError.AddError(ErrorCatalog.InternalBackendApiErrorVerifyUserExists);
        }
    }
}