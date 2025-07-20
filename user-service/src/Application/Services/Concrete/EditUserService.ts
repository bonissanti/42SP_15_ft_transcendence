import {FastifyReply} from "fastify";
import {BaseService} from "../Interfaces/BaseService.js";
import {EditUserDTO} from "../../DTO/Command/EditUserDTO.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {EditUserCommand} from "../../../Domain/Command/CommandObject/EditUserCommand.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {EditUserCommandHandler} from "../../../Domain/Command/Handlers/EditUserCommandHandler.js";
import {EditUserCommandValidator} from "../../../Domain/Command/Validators/EditUserCommandValidator.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import { ValidationException } from "../../../Shared/Errors/ValidationException.js";
import { Result } from "../../../Shared/Utils/Result.js";

export class EditUserService implements BaseService<EditUserDTO>
{
    private UserRepository: UserRepository;
    private EditUserHandler: EditUserCommandHandler;
    private EditUserValidator: EditUserCommandValidator;

    constructor(userRepository: UserRepository, notificationError: NotificationError)
    {
        this.UserRepository = userRepository;
        this.EditUserValidator = new EditUserCommandValidator(this.UserRepository, notificationError);
        this.EditUserHandler = new EditUserCommandHandler(this.UserRepository, notificationError);
    }

    public async Execute(dto: EditUserDTO, reply: FastifyReply) : Promise<Result<void>>
    {
        try
        {
            const command: EditUserCommand = EditUserCommand.FromDTO(dto);
            await this.EditUserValidator.Validator(command);
            await this.EditUserHandler.Handle(command);

            return Result.Sucess("User edited successfully");
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