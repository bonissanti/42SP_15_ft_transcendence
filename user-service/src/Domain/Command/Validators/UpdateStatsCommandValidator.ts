import {BaseValidator} from "./BaseValidator.js";
import {UpdateStatsCommand} from "../CommandObject/UpdateStatsCommand.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {CustomError} from "../../../Shared/Errors/CustomError.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";

export class UpdateStatsCommandValidator implements BaseValidator<UpdateStatsCommand>
{
    private userRepository: UserRepository;
    private notificationError: NotificationError;

    constructor(userRepository: UserRepository, notificationError: NotificationError)
    {
        this.userRepository = userRepository;
        this.notificationError = notificationError;
    }

    public async Validator(command: UpdateStatsCommand): Promise<void>
    {
        const usersList: (string | null)[] = [command.player1Username, command.player2Username, command.player3Username, command.player4Username];

        if (command.player1Points < 0 || command.player2Points < 0)
            this.notificationError.AddError(ErrorCatalog.NegativePoints);

        if ((command.player3Points && command.player3Points < 0) || (command.player4Points && command.player4Points < 0))
            this.notificationError.AddError(ErrorCatalog.NegativePoints);

        if (!await this.userRepository.VerifyIfUsersExistsByUsername(usersList))
            this.notificationError.AddError(ErrorCatalog.UserNotFound);

        if (this.notificationError.NumberOfErrors() > 0)
        {
            const allErrors: CustomError[] = this.notificationError.GetAllErrors();
            throw new ValidationException(allErrors);
        }
    }
}