import {UserSessionDTO} from "../../../Domain/DTO/Command/UserSessionDTO.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {BaseService} from "../Interfaces/BaseService.js";
import {UserSessionCommand} from "../../Command/CommandObject/UserSessionCommand.js";
import {LogoutSessionCommandHandler} from "../../Command/Handlers/LogoutSessionCommandHandler.js";
import {LogoutSessionCommandValidator} from "../../Command/Validators/LogoutSessionCommandValidator.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import { Result } from "src/Shared/Utils/Result.js";

export class LogoutUserService implements BaseService<UserSessionDTO>
{
    private readonly UserRepository: UserRepository;
    private readonly LogoutUserHandler: LogoutSessionCommandHandler;
    private readonly LogoutUserValidator: LogoutSessionCommandValidator;

    constructor(notification: NotificationError)
    {
        this.UserRepository = new UserRepository();
        this.LogoutUserValidator = new LogoutSessionCommandValidator(this.UserRepository, notification);
        this.LogoutUserHandler = new LogoutSessionCommandHandler(this.UserRepository);
    }

    public async Execute(dto: UserSessionDTO): Promise<Result<void>>
    {
        try
        {
            const command: UserSessionCommand = UserSessionCommand.FromDTO(dto);
            await this.LogoutUserValidator.Validator(command);
            await this.LogoutUserHandler.Handle(command);

            return Result.Sucess("User logged out successfully");
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message);
            }
            else if (error instanceof  PrismaClientKnownRequestError)
            {
                if (error.code === 'P2002')
                    return Result.Failure(ErrorCatalog.UsernameAlreadyExists.SetError());

                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }
}