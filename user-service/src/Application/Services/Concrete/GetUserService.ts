import { BaseService } from "../Interfaces/BaseService.js";
import { GetUserDTO } from "../../DTO/Query/GetUserDTO.js";
import { NotificationError } from "../../../Shared/Errors/NotificationError.js";
import { FastifyReply } from "fastify";
import { GetUserQuery } from "../../../Domain/Queries/QueryObject/GetUserQuery.js";
import { GetUserQueryHandler } from "../../../Domain/Queries/Handlers/GetUserQueryHandler.js";
import { UserRepository } from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import { GetUserViewModel } from "../../ViewModels/GetUserViewModel.js";
import { Result } from "../../../Shared/Utils/Result.js";
import { ValidationException } from "../../../Shared/Errors/ValidationException.js";
import { ErrorCatalog } from "../../../Shared/Errors/ErrorCatalog.js";
import { Prisma } from '@prisma/client';

export class GetUserService implements BaseService<GetUserDTO, GetUserViewModel> {
    private UserRepository: UserRepository;
    private GetUserQueryHandler: GetUserQueryHandler;

    constructor(userRepository: UserRepository, notificationError: NotificationError) {
        this.UserRepository = userRepository;
        this.GetUserQueryHandler = new GetUserQueryHandler(this.UserRepository, notificationError);
    }

    public async Execute(dto: GetUserDTO, reply: FastifyReply): Promise<Result<GetUserViewModel>>
    {
        try
        {
            const query: GetUserQuery = GetUserQuery.FromDTO(dto);
            const getUserQueryDTO = await this.GetUserQueryHandler.Handle(query);

            if (!getUserQueryDTO) {
                return Result.Failure<GetUserViewModel>(ErrorCatalog.UserNotFound.SetError());
            }

            const getUserViewModel = GetUserViewModel.FromQueryDTO(getUserQueryDTO);
            return Result.SucessWithData<GetUserViewModel>("User found", getUserViewModel);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<GetUserViewModel>(message);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }
}
