import {BaseService} from "../Interfaces/BaseService.js";
import {UserSessionDTO} from "../../DTO/ToCommand/UserSessionDTO.js";
import {LoginSessionCommandHandler} from "../../../Domain/Command/Handlers/LoginSessionCommandHandler.js";
import {LoginSessionCommandValidator} from "../../../Domain/Command/Validators/LoginSessionCommandValidator.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {UserSessionCommand} from "../../../Domain/Command/CommandObject/UserSessionCommand.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import { Result } from "../../../Shared/Utils/Result.js";

export class LoginUserService  implements BaseService<UserSessionDTO>
{
    private readonly UserRepository: UserRepository;
    private readonly LoginUserHandler: LoginSessionCommandHandler;
    private readonly LoginUserValidator: LoginSessionCommandValidator;

    constructor(userRepository: UserRepository, notification: NotificationError)
    {
        this.UserRepository = userRepository;
        this.LoginUserValidator = new LoginSessionCommandValidator(this.UserRepository, notification);
        this.LoginUserHandler = new LoginSessionCommandHandler(this.UserRepository, notification);
    }

    public async Execute(dto: UserSessionDTO) : Promise<Result<void>>
    {
        try
        {
            const command: UserSessionCommand = UserSessionCommand.FromDTO(dto);
            await this.LoginUserValidator.Validator(command);
            await this.LoginUserHandler.Handle(command);

            return Result.Sucess("User logged in successfully");
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