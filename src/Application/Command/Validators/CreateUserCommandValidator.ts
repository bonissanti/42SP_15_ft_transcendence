import {CreateUserCommand} from "../CommandObject/CreateUserCommand";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository";
import {EmailVO} from "../../../Domain/ValueObjects/EmailVO";
import {PasswordHashVO} from "../../../Domain/ValueObjects/PasswordHashVO";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {BaseValidator} from "./BaseValidator";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog";
import {ValidationException} from "../../../Shared/Errors/ValidationException";
import {CustomError} from "../../../Shared/Errors/CustomError";

export class CreateUserCommandValidator implements BaseValidator<CreateUserCommand>
{
    private UserRepository: UserRepository;
    private NotificationError: NotificationError;

    constructor(userRepository: UserRepository, notificationError: NotificationError)
    {
        this.UserRepository = userRepository;
        this.NotificationError = notificationError;
    }

    public Validator(command: CreateUserCommand): void
    {
        if (!EmailVO.ValidEmail(command.Email)) {
            this.NotificationError.AddError(ErrorCatalog.InvalidEmail);
        }

        if (!PasswordHashVO.ValidPassword(command.Password)) {
            this.NotificationError.AddError(ErrorCatalog.InvalidPassword);
        }

        // if (!this.UserRepository.FindByUsername(command.Username)) {
        //     notificationError.AddError(ErrorCatalog.UsernameAlreadyExists);
        // }

        if (this.NotificationError.NumberOfErrors() > 0){
            const allErrors : CustomError[] = this.NotificationError.GetAllErrors();
            throw new ValidationException(allErrors);
        }
    }
}