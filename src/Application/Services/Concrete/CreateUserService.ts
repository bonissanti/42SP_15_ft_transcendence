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

export class CreateUserService implements BaseService<CreateUserDTO>
{
    private UserRepository: UserRepository;
    private NotificationError: NotificationError;
    private CreateUserHandler: CreateUserCommandHandler;
    private CreateUserValidator: CreateUserCommandValidator;

    constructor(notificationError: NotificationError)
    {
        this.UserRepository = new UserRepository();
        this.NotificationError = notificationError;
        this.CreateUserHandler = new CreateUserCommandHandler(this.UserRepository, notificationError);
        this.CreateUserValidator = new CreateUserCommandValidator(this.UserRepository, notificationError);
    }

    public async Execute(dto: CreateUserDTO, reply: FastifyReply) : Promise<Result>
    {
        try
        {
            const command: CreateUserCommand = CreateUserCommand.FromDTO(dto);
            this.CreateUserValidator.Validator(command);
            await this.CreateUserHandler.Handle(command);

            return Result.Sucess();
        }
        catch (error){
            return Result.Failure(ErrorCatalog.InternalServerError);
        }
    }
}
