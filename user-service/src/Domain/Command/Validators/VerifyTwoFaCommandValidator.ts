import {BaseValidator} from "./BaseValidator.js";
import {VerifyTwoFaCommand} from "../CommandObject/VerifyTwoFaCommand.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {CustomError} from "../../../Shared/Errors/CustomError.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {authenticator} from "otplib";

export class VerifyTwoFaCommandValidator implements BaseValidator<VerifyTwoFaCommand>
{
    private UserRepository: UserRepository;
    private NotificationError: NotificationError;

    constructor(userRepository: UserRepository, notificationError: NotificationError)
    {
        this.UserRepository = userRepository;
        this.NotificationError = notificationError;
    }

    public async Validator(command: VerifyTwoFaCommand): Promise<void>
    {
        const user = await this.UserRepository.GetUserEntityByUuid(command.uuid);

        if (!user || !user.TwoFactorEnabled || !user.twoFactorSecret)
            this.NotificationError.AddError(ErrorCatalog.InvalidToken2Fa);
        else
        {
            const isValid = authenticator.verify({ token: command.code, secret: user.twoFactorSecret });
            if (!isValid)
                this.NotificationError.AddError(ErrorCatalog.InvalidToken2Fa);
        }

        if (this.NotificationError.NumberOfErrors() > 0){
            const allErrors : CustomError[] = this.NotificationError.GetAllErrors();
            throw new ValidationException(allErrors);
        }
    }
}
