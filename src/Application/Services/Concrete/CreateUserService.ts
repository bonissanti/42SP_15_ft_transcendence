import {CreateUserDTO} from "../../../Domain/DTO/Command/CreateUserDTO.js";
import {BaseService} from "../Interfaces/BaseService.js";
import {FastifyReply} from "fastify";
import {Result} from "../../../Shared/Utils/Result.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {CreateUserCommand} from "../../Command/CommandObject/CreateUserCommand.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {CreateUserCommandHandler} from "../../Command/Handlers/CreateUserCommandHandler.js";
import {CreateUserCommandValidator} from "../../Command/Validators/CreateUserCommandValidator.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import prisma from "@prisma";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/edge";

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
