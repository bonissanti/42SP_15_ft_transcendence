import {FastifyReply} from "fastify";
import {BaseService} from "../Interfaces/BaseService.js";
import {Prisma} from "@prisma/client";
import {Result} from "../../../Shared/Utils/Result.js";
import {AddRequestFriendDTO} from "../../DTO/ToCommand/AddRequestFriendDTO.js";
import {AddRequestFriendCommand} from "../../../Domain/Command/CommandObject/AddRequestFriendCommand.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {ChangeRequestFriendStatusDTO} from "../../DTO/ToCommand/ChangeRequestFriendStatusDTO.js";
import {
    ChangeRequestFriendStatusCommand
} from "../../../Domain/Command/CommandObject/ChangeRequestFriendStatusCommand.js";
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
import {GetFriendshipListDTO} from "../../DTO/ToQuery/GetFriendshipListDTO.js";
import {GetFriendshipListQuery} from "../../../Domain/Queries/QueryObject/GetFriendshipListQuery.js";
import {GetFriendshipListQueryHandler} from "../../../Domain/Queries/Handlers/GetFriendshipListQueryHandler.js";
import {GetFriendshipListQueryValidator} from "../../../Domain/Queries/Validators/GetFriendshipListQueryValidator.js";
import {GetFriendshipListViewModel} from "../../ViewModels/GetFriendshipListViewModel.js";
import {ErrorTypeEnum} from "../../Enums/ErrorTypeEnum.js";
import {DeleteFriendDTO} from "../../DTO/ToCommand/DeleteFriendDTO.js";
import {DeleteFriendCommand} from "../../../Domain/Command/CommandObject/DeleteFriendCommand.js";
import {DeleteFriendCommandValidator} from "../../../Domain/Command/Validators/DeleteFriendCommandValidator.js";
import {DeleteFriendCommandHandler} from "../../../Domain/Command/Handlers/DeleteFriendCommandHandler.js";

export class FriendshipService implements BaseService<any, boolean>
{
    private readonly AddRequestFriendHandler: AddRequestFriendCommandHandler;
    private readonly AddRequestFriendValidator: AddRequestFriendCommandValidator;
    private readonly ChangeRequestFriendStatusHandler: ChangeRequestFriendStatusCommandHandler;
    private readonly ChangeRequestFriendStatusValidator: ChangeRequestFriendStatusCommandValidator;
    private readonly GetFriendshipHandler: GetFriendshipListQueryHandler;
    private readonly GetFriendshipValidator: GetFriendshipListQueryValidator;
    private readonly DeleteFriendValidator: DeleteFriendCommandValidator;
    private readonly DeleteFriendHandler: DeleteFriendCommandHandler;
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
        this.GetFriendshipHandler = new GetFriendshipListQueryHandler(friendshipRepository, notificationError);
        this.GetFriendshipValidator = new GetFriendshipListQueryValidator(userRepository, notificationError);
        this.DeleteFriendHandler = new DeleteFriendCommandHandler(friendshipRepository, notificationError);
        this.DeleteFriendValidator = new DeleteFriendCommandValidator(friendshipRepository, userRepository, notificationError);

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

            return Result.Success("Request sent successfully to user");
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message, ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum.CONFLICT);

            return Result.Failure(ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum.INTERNAL);
        }
    }

    public async ChangeStatusService(dto: ChangeRequestFriendStatusDTO, reply: FastifyReply): Promise<Result<void>>
    {
        try
        {
            const command: ChangeRequestFriendStatusCommand = ChangeRequestFriendStatusCommand.fromDTO(dto);
            await this.ChangeRequestFriendStatusValidator.Validator(command);
            await this.ChangeRequestFriendStatusHandler.Handle(command);

            return Result.Success(`Request status changed to ${command.status}`);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message, ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum.CONFLICT);

            return Result.Failure(ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum.INTERNAL);
        }
    }

    public async ListFriendService(dto: GetFriendshipListDTO, reply: FastifyReply): Promise<Result<GetFriendshipListViewModel[]>>
    {
        try
        {
            let getFriendshipViewModel: GetFriendshipListViewModel[] = [];
            const query = GetFriendshipListQuery.fromQuery(dto);
            await this.GetFriendshipValidator.Validator(query);
            const getFriendshipQueryDTO = await this.GetFriendshipHandler.Handle(query);

            if (!getFriendshipQueryDTO)
                return Result.SuccessWithData<GetFriendshipListViewModel[]>("Friend's list from user not found", getFriendshipViewModel);

            getFriendshipViewModel = GetFriendshipListViewModel.fromQueryDTO(getFriendshipQueryDTO);
            return Result.SuccessWithData<GetFriendshipListViewModel[]>("Friend's list from user found successfully", getFriendshipViewModel);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<GetFriendshipListViewModel[]>(message, ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum.CONFLICT);
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum.INTERNAL);
        }
    }

    public async DeleteFriendService(dto: DeleteFriendDTO, reply: FastifyReply): Promise<Result>
    {
        try
        {
            const command = DeleteFriendCommand.fromDTO(dto);
            await this.DeleteFriendValidator.Validator(command);
            await this.DeleteFriendHandler.Handle(command);

            return Result.Success("Friend deleted successfully");
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message, ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum.CONFLICT);

            return Result.Failure(ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum.INTERNAL);
        }
    }
}