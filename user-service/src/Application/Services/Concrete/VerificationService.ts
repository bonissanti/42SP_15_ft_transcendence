import {BaseService} from "../Interfaces/BaseService.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {VerifyIfUsersExistsByUuidsDTO} from "../../../Domain/DTO/Query/VerifyIfUsersExistsByUuidsDTO.js";
import {FastifyReply} from "fastify";
import {Result} from "../../../Shared/Utils/Result.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {GetUserViewModel} from "../../../Presentation/ViewModels/GetUserViewModel.js";
import {Prisma} from "@prisma/client";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {VerifyIfUsersExistsByUuidsQuery} from "../../Queries/QueryObject/VerifyIfUsersExistsByUuidsQuery.js";
import {VerifyIfUsersExistsByUuidsQueryHandler} from "../../Queries/Handlers/VerifyIfUsersExistsByUuidsQueryHandler.js";

export class VerificationService implements BaseService<any,  boolean>
{
    private VerifyIfUserExistsQueryHandler: VerifyIfUsersExistsByUuidsQueryHandler;

    constructor(private userRepository: UserRepository, notificationError: NotificationError)
    {
        this.VerifyIfUserExistsQueryHandler = new VerifyIfUsersExistsByUuidsQueryHandler(userRepository, notificationError);
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
}