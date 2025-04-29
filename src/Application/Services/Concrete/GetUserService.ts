import {BaseService} from "../Interfaces/BaseService.js";
import {GetUserDTO} from "../../../Domain/DTO/Query/GetUserDTO.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {FastifyReply} from "fastify";
import {GetUserQuery} from "../../Queries/QueryObject/GetUserQuery.js";
import {GetUserQueryHandler} from "../../Queries/Handlers/GetUserQueryHandler.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {GetUserViewModel} from "../../../Presentation/ViewModels/GetUserViewModel.js";
import {Result} from "../../../Shared/Utils/Result.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";

export class GetUserService implements BaseService<GetUserDTO, GetUserViewModel>
{
    private UserRepository: UserRepository;
    private GetUserQueryHandler: GetUserQueryHandler;

    constructor(notificationError: NotificationError)
    {
        this.UserRepository = new UserRepository();
        this.GetUserQueryHandler = new GetUserQueryHandler(this.UserRepository, notificationError);
    }

    public async Execute(dto: GetUserDTO, reply: FastifyReply) : Promise<Result<GetUserViewModel>>
    {
        try
        {
            const query: GetUserQuery = GetUserQuery.FromDTO(dto);
            const getUserQueryDTO = await this.GetUserQueryHandler.Handle(query);
            const getUserViewModel = GetUserViewModel.FromQueryDTO(getUserQueryDTO);

            return Result.SucessWithData<GetUserViewModel>("User found", getUserViewModel);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<GetUserViewModel>(message, );
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