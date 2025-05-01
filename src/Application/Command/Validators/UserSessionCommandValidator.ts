import {BaseValidator} from "./BaseValidator.js";
import {UserSessionCommand} from "../CommandObject/UserSessionCommand.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {EmailVO} from "../../../Domain/ValueObjects/EmailVO.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {PasswordHashVO} from "../../../Domain/ValueObjects/PasswordHashVO.js";
import {CustomError} from "../../../Shared/Errors/CustomError.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";

export class UserSessionCommandValidator implements BaseValidator<UserSessionCommand>
{
    constructor(private UserRepository: UserRepository, private NotificationError: NotificationError)
    {
    }

    public async Validator(command: UserSessionCommand): Promise<void>
    {
        if (!await this.UserRepository.VerifyIfUserExistsByUUID(command.Uuid))
            this.NotificationError.AddError(ErrorCatalog.UserNotFound)

        if (!EmailVO.ValidEmail(command.Email))
            this.NotificationError.AddError(ErrorCatalog.InvalidEmail);

        if (!PasswordHashVO.ValidPassword(command.Password))
            this.NotificationError.AddError(ErrorCatalog.InvalidPassword);

        const user = await this.UserRepository.GetUserEntityByUuid(command.Uuid);
        if (!user)
            this.NotificationError.AddError(ErrorCatalog.UserNotFound);

        const passwordHashLogin: PasswordHashVO = await PasswordHashVO.Create(command.Password);
        const emailLogin: EmailVO = EmailVO.AddEmail(command.Email);

        if (passwordHashLogin != user?.PasswordHash)
            this.NotificationError.AddError(ErrorCatalog.WrongPassword);

        if (emailLogin != user?.Email)
            this.NotificationError.AddError(ErrorCatalog.WrongEmail);

        if (this.NotificationError.NumberOfErrors() > 0) {
            const allErrors: CustomError[] = this.NotificationError.GetAllErrors();
            throw new ValidationException(allErrors);
        }
    }
}