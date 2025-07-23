import {BaseService} from "../Interfaces/BaseService.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {FastifyReply} from "fastify";
import {Result} from "../../../Shared/Utils/Result.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {Prisma} from "@prisma/client";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {UpdateStatsCommand} from "../../../Domain/Command/CommandObject/UpdateStatsCommand.js";
import {UpdateStatsDTO} from "../../DTO/ToCommand/UpdateStatsDTO.js";
import {UpdateStatsCommandValidator} from "../../../Domain/Command/Validators/UpdateStatsCommandValidator.js";
import {UpdateStatsCommandHandler} from "../../../Domain/Command/Handlers/UpdateStatsCommandHandler.js";
import {VerifyIfUserExistsByUsernameQuery} from "../../../Domain/Queries/QueryObject/VerifyIfUserExistsByUsernameQuery.js";
import {VerifyUserExistsByUsernameQueryHandler} from "../../../Domain/Queries/Handlers/VerifyUserExistsByUsernameQueryHandler.js";
import {VerifyIfUserExistsByUsernameDTO} from "../../DTO/ToQuery/VerifyIfUserExistsByUsernameDTO.js";
import {
    VerifyIfUsersExistsByUsernamesQuery
} from "../../../Domain/Queries/QueryObject/VerifyIfUsersExistsByUsernamesQuery.js";
import {
    VerifyIfUsersExistsByUsernamesQueryHandler
} from "../../../Domain/Queries/Handlers/VerifyIfUsersExistsByUsernamesQueryHandler.js";
import {VerifyIfUsersExistsByUuidsQuery} from "../../../Domain/Queries/QueryObject/VerifyIfUsersExistsByUuidsQuery.js";
import {
    VerifyIfUsersExistsByUuidsQueryHandler
} from "../../../Domain/Queries/Handlers/VerifyIfUsersExistsByUuidsQueryHandler.js";
import {VerifyIfUsersExistsByUuidsDTO} from "../../DTO/ToQuery/VerifyIfUsersExistsByUuidsDTO.js";

export class UserService implements BaseService<any,  boolean>
{
    private VerifyIfUserExistsQueryHandler: VerifyIfUsersExistsByUuidsQueryHandler;
    private VerifyUsersByUsernamesQueryHandler: VerifyIfUsersExistsByUsernamesQueryHandler;
    private VerifyIfUserExistsByUsernameQueryHandler: VerifyUserExistsByUsernameQueryHandler;
    private UpdateStatsValidator: UpdateStatsCommandValidator;
    private UpdateStatsHandler: UpdateStatsCommandHandler;

    constructor(private userRepository: UserRepository, notificationError: NotificationError)
    {
        this.VerifyIfUserExistsQueryHandler = new VerifyIfUsersExistsByUuidsQueryHandler(userRepository, notificationError);
        this.VerifyUsersByUsernamesQueryHandler = new VerifyIfUsersExistsByUsernamesQueryHandler(userRepository, notificationError);
        this.VerifyIfUserExistsByUsernameQueryHandler = new VerifyUserExistsByUsernameQueryHandler(userRepository, notificationError);
        this.UpdateStatsValidator = new UpdateStatsCommandValidator(userRepository, notificationError);
        this.UpdateStatsHandler = new UpdateStatsCommandHandler(userRepository, notificationError);
    }

    Execute(dto: any, reply: FastifyReply): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }

    public async VerifyIfUserExistsByUuidsService(dto: VerifyIfUsersExistsByUuidsDTO, reply: FastifyReply): Promise<Result<boolean>>
    {
        try
        {
            const query: VerifyIfUsersExistsByUuidsQuery = VerifyIfUsersExistsByUuidsQuery.FromDTO(dto);
            const exists = await this.VerifyIfUserExistsQueryHandler.Handle(query);

            if (!exists)
                return Result.Failure<boolean>("User does not exists");

            return Result.SucessWithData<boolean>("All users exists!", exists);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<false>(message);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }

    public async VerifyIfUsersExistsByUsernamesService(dto: VerifyIfUsersExistsByUsernamesQuery, reply: FastifyReply): Promise<Result<boolean>>
    {
        try
        {
            const query: VerifyIfUsersExistsByUsernamesQuery = VerifyIfUsersExistsByUsernamesQuery.FromDTO(dto);
            const exists = await this.VerifyUsersByUsernamesQueryHandler.Handle(query);

            if (!exists)
                return Result.Failure<boolean>("User does notists");

            return Result.SucessWithData<boolean>("All users exists!", exists);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<false>(message);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }

    public async UpdateStatsService(dto: UpdateStatsDTO, reply: FastifyReply): Promise<Result<void>>
    {
        try
        {
            const command: UpdateStatsCommand = UpdateStatsCommand.fromDTO(dto);
            await this.UpdateStatsValidator.Validator(command);
            await this.UpdateStatsHandler.Handle(command);

            return Result.Sucess(`Stats from ${command.player1Username} and ${command.player2Username} updated successfully`);
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
                }
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }

    public async VerifyIfUserExistsByUsernameService(dto: VerifyIfUserExistsByUsernameDTO, reply: FastifyReply): Promise<Result<boolean>>
    {
        try
        {
            const query: VerifyIfUserExistsByUsernameQuery = VerifyIfUserExistsByUsernameQuery.fromQuery(dto);
            console.log("Received request to verify if user exists by username:", query.username);
            const exists = await this.VerifyIfUserExistsByUsernameQueryHandler.Handle(query)

            if (!exists)
                return Result.Failure<boolean>(`User ${query.username} does not exists`);

            return Result.SucessWithData<boolean>(`User ${query.username} exists`, exists);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<false>(message);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }
}