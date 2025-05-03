import {FastifyReply} from "fastify";
import {BaseService} from "../Interfaces/BaseService.js";
import {DeleteUserDTO} from "../../../Domain/DTO/Command/DeleteUserDTO.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {DeleteUserCommandValidator} from "../../Command/Validators/DeleteUserCommandValidator.js";
import {DeleteUserCommand} from "../../Command/CommandObject/DeleteUserCommand.js";
import {DeleteUserCommandHandler} from "../../Command/Handlers/DeleteUserCommandHandler.js";
import {Result} from "../../../Shared/Utils/Result.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/edge";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";

export class DeleteUserService implements  BaseService<DeleteUserDTO>
{
    private UserRepository: UserRepository;
    private DeleteUserHandler: DeleteUserCommandHandler;
    private DeleteUserValidator: DeleteUserCommandValidator;

    constructor(notificationError: NotificationError)
    {
        this.UserRepository = new UserRepository();
        this.DeleteUserValidator = new DeleteUserCommandValidator(this.UserRepository, notificationError);
        this.DeleteUserHandler = new DeleteUserCommandHandler(this.UserRepository, notificationError);
    }

    public async Execute(dto: DeleteUserDTO, reply: FastifyReply): Promise<Result>
    {
        try
        {
            const command: DeleteUserCommand = DeleteUserCommand.FromDTO(dto);
            this.DeleteUserValidator.Validator(command);
            await this.DeleteUserHandler.Handle(command);

            return Result.Sucess("User deleted successfully");
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message);
            }
            else if (error instanceof PrismaClientKnownRequestError)
            {
                if (error.code === 'P2002')
                    return Result.Failure(ErrorCatalog.UsernameAlreadyExists.SetError());

                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }
}