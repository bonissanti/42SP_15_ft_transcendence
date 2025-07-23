import {FastifyReply} from "fastify";
import {BaseService} from "../Interfaces/BaseService.js";
import {Result} from "../../../Shared/Utils/Result.js";
import {AddRequestFriendDTO} from "../../DTO/ToCommand/AddRequestFriendDTO.js";
import {AddRequestFriendCommand} from "../../../Domain/Command/CommandObject/AddRequestFriendCommand.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {ChangeRequestFriendStatusDTO} from "../../DTO/ToCommand/ChangeRequestFriendStatusDTO.js";
import {ChangeRequestFriendStatusCommand} from "../../../Domain/Command/CommandObject/ChangeRequestFriendStatusCommand.js";
import {AddRequestFriendCommandHandler} from "../../../Domain/Command/Handlers/AddRequestFriendCommandHandler.js";
import {AddRequestFriendCommandValidator} from "../../../Domain/Command/Validators/AddRequestFriendCommandValidator.js";
import {
    ChangeRequestFriendStatusCommandHandler
} from "../../../Domain/Command/Handlers/ChangeRequestFriendStatusCommandHandler.js";
import {
    ChangeRequestFriendStatusCommandValidator
} from "../../../Domain/Command/Validators/ChangeRequestFriendStatusCommandValidator.js";
import {FriendshipRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/FriendshipRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";

export class FriendshipService implements BaseService<any, boolean>
{
    private readonly AddRequestFriendHandler: AddRequestFriendCommandHandler;
    private readonly AddRequestFriendValidator: AddRequestFriendCommandValidator;
    private readonly ChangeRequestFriendStatusHandler: ChangeRequestFriendStatusCommandHandler;
    private readonly ChangeRequestFriendStatusValidator: ChangeRequestFriendStatusCommandValidator;
    private readonly FriendshipRepository: FriendshipRepository;
    private readonly UserRepository: UserRepository;

    constructor(friendshipRepository: FriendshipRepository, userRepository: UserRepository, notificationError: NotificationError)
    {
        this.FriendshipRepository = friendshipRepository;
        this.UserRepository = userRepository;
        this.AddRequestFriendHandler = new AddRequestFriendCommandHandler(friendshipRepository, notificationError);
        this.AddRequestFriendValidator = new AddRequestFriendCommandValidator(friendshipRepository, userRepository, notificationError);
        this.ChangeRequestFriendStatusHandler = new ChangeRequestFriendStatusCommandHandler(friendshipRepository, notificationError);
        this.ChangeRequestFriendStatusValidator = new ChangeRequestFriendStatusCommandValidator(friendshipRepository, notificationError);

    }

    Execute(dto: any, reply: FastifyReply): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }

    public async AddFriendService(dto: AddRequestFriendDTO, reply: FastifyReply): Promise<Result<void>>
    {
        try
        {
            const command: AddRequestFriendCommand = AddRequestFriendCommand.fromDTO(dto);
            await this.AddRequestFriendValidator.Validator(command);
            await this.AddRequestFriendHandler.Handle(command);

            return Result.Sucess("Request sent successfully to user");
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                if (error.code === 'P2002') {
                    const target = error.meta?.target as string[];

                    if (target?.includes('username')) {
                        return Result.Failure(ErrorCatalog.UsernameAlreadyExists.SetError());
                    }

                    if (target?.includes('email')) {
                        return Result.Failure("Code:409 Message:Este email já está em uso.");
                    }
                }
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }

    public async ChangeStatusService(dto: ChangeRequestFriendStatusDTO, reply: FastifyReply): Promise<Result<void>>
    {
        try
        {
            const command: ChangeRequestFriendStatusCommand = ChangeRequestFriendStatusCommand.fromDTO(dto);
            await this.ChangeRequestFriendStatusValidator.Validator(command);
            await this.ChangeRequestFriendStatusHandler.Handle(command);

            return Result.Sucess(`Request status changed to ${command.status}`);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                if (error.code === 'P2002') {
                    const target = error.meta?.target as string[];

                    if (target?.includes('username')) {
                        return Result.Failure(ErrorCatalog.UsernameAlreadyExists.SetError());
                    }

                    if (target?.includes('email')) {
                        return Result.Failure("Code:409 Message:Este email já está em uso.");
                    }
                }
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }

    //TODO: adicionar service para listar amizades por status passado (pending/accept)
    // public async ListFriendService(dto: List)
}