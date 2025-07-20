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
        const usersList: string[] = [command.player1Username, command.player2Username];

        if (command.player1Points < 0 || command.player2Points < 0)
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