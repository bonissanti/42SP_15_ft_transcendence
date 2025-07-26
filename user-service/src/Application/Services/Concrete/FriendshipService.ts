import {FastifyReply} from "fastify";
import {BaseService} from "../Interfaces/BaseService.js";
import {Prisma} from "@prisma/client";
import {Result} from "../../../Shared/Utils/Result.js";
import {AddRequestFriendDTO} from "../../DTO/ToCommand/AddRequestFriendDTO.js";
import {AddRequestFriendCommand} from "../../../Domain/Command/CommandObject/AddRequestFriendCommand.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {ChangeRequestFriendStatusDTO} from "../../DTO/ToCommand/ChangeRequestFriendStatusDTO.js";
import {ChangeRequestFriendStatusCommand} from "../../../Domain/Command/CommandObject/ChangeRequestFriendStatusCommand.js";
import {AddRequestFriendCommandHandler} from "../../../Domain/Command/Handlers/AddRequestFriendCommandHandler.js";
import {AddRequestFriendCommandValidator} from "../../../Domain/Command/Validators/AddRequestFriendCommandValidator.js";
import {ChangeRequestFriendStatusCommandHandler} from "../../../Domain/Command/Handlers/ChangeRequestFriendStatusCommandHandler.js";
import {ChangeRequestFriendStatusCommandValidator} from "../../../Domain/Command/Validators/ChangeRequestFriendStatusCommandValidator.js";
import {FriendshipRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/FriendshipRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {GetFriendshipListDTO} from "../../DTO/ToQuery/GetFriendshipListDTO.js";
import {GetFriendshipListQuery} from "../../../Domain/Queries/QueryObject/GetFriendshipListQuery.js";
import {GetFriendshipListQueryHandler} from "../../../Domain/Queries/Handlers/GetFriendshipListQueryHandler.js";
import {GetFriendshipListQueryValidator} from "../../../Domain/Queries/Validators/GetFriendshipListQueryValidator.js";
import {GetFriendshipListViewModel} from "../../ViewModels/GetFriendshipListViewModel.js";
import {ErrorTypeEnum} from "../../Enums/ErrorTypeEnum.js";

export class FriendshipService implements BaseService<any, boolean>
{
    private readonly AddRequestFriendHandler: AddRequestFriendCommandHandler;
    private readonly AddRequestFriendValidator: AddRequestFriendCommandValidator;
    private readonly ChangeRequestFriendStatusHandler: ChangeRequestFriendStatusCommandHandler;
    private readonly ChangeRequestFriendStatusValidator: ChangeRequestFriendStatusCommandValidator;
    private readonly GetFriendshipHandler: GetFriendshipListQueryHandler;
    private readonly GetFriendshipValidator: GetFriendshipListQueryValidator;
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
            {
                if (error.code === 'P2002') {
                    const target = error.meta?.target as string[];

                    if (target?.includes('username')) {
                        return Result.Failure(ErrorCatalog.UsernameAlreadyExists.SetError(), ErrorTypeEnum.VALIDATION);
                    }

                    if (target?.includes('email')) {
                        return Result.Failure("Code:409 Message:Este email já está em uso.", ErrorTypeEnum.VALIDATION);
                    }
                }
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum.CONFLICT);
            }
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

    public async ListFriendService(dto: GetFriendshipListDTO, reply: FastifyReply): Promise<Result<GetFriendshipListViewModel[]>>
    {
        try
        {
            const query = GetFriendshipListQuery.fromQuery(dto);
            await this.GetFriendshipValidator.Validator(query);
            const getFriendshipQueryDTO = await this.GetFriendshipHandler.Handle(query);

            if (!getFriendshipQueryDTO)
                return Result.Failure<GetFriendshipListViewModel[]>(ErrorCatalog.UserNotFound.SetError());

            const getFriendshipViewModel = GetFriendshipListViewModel.fromQueryDTO(getFriendshipQueryDTO);
            return Result.SuccessWithData<GetFriendshipListViewModel[]>("Friend's list from user found successfully", getFriendshipViewModel);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<GetFriendshipListViewModel[]>(message);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }
}