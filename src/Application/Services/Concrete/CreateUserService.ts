import {CreateUserDTO} from "../../../Domain/DTO/Command/CreateUserDTO";
import {BaseService} from "../Interfaces/BaseService";
import {FastifyReply} from "fastify";
import {Result} from "../../../Shared/Utils/Result";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog";
import {CreateUserCommand} from "../../Command/CommandObject/CreateUserCommand";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository";
import {CreateUserCommandHandler} from "../../Command/Handlers/CreateUserCommandHandler";
import {CreateUserCommandValidator} from "../../Command/Validators/CreateUserCommandValidator";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {ValidationException} from "../../../Shared/Errors/ValidationException";
import {CustomError} from "../../../Shared/Errors/CustomError";
import prisma from "../../../Infrastructure/Client/PrismaClient";

export class CreateUserService implements BaseService<CreateUserDTO>
{
    private UserRepository: UserRepository;
    private CreateUserHandler: CreateUserCommandHandler;
    private CreateUserValidator: CreateUserCommandValidator;

    constructor(notificationError: NotificationError)
    {
        this.UserRepository = new UserRepository();
        this.CreateUserValidator = new CreateUserCommandValidator(this.UserRepository, notificationError);
        this.CreateUserHandler = new CreateUserCommandHandler(this.UserRepository, notificationError);
    }

    public async Execute(dto: CreateUserDTO, reply: FastifyReply) : Promise<Result>
    {
        try
        {
            const command: CreateUserCommand = CreateUserCommand.FromDTO(dto);
            this.CreateUserValidator.Validator(command);
            await this.CreateUserHandler.Handle(command);

            return Result.Sucess("User created successfully");
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message);
            }
            else if (error instanceof prisma.PrismaClientKnownRequestError.Code)
            {
                if (prisma.PrismaClientKnownRequestError.code == 'P2002')
                    return Result.Failure(ErrorCatalog.UsernameAlreadyExists.SetError());

                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }
}
