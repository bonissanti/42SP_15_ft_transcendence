import { BaseService } from "../Interfaces/BaseService.js";
import { GetUserDTO } from "../../../Domain/DTO/Query/GetUserDTO.js";
import { NotificationError } from "../../../Shared/Errors/NotificationError.js";
import { FastifyReply } from "fastify";
import { GetUserQuery } from "../../Queries/QueryObject/GetUserQuery.js";
import { GetUserQueryHandler } from "../../Queries/Handlers/GetUserQueryHandler.js";
import { UserRepository } from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import { GetUserViewModel } from "../../../Presentation/ViewModels/GetUserViewModel.js";
import { Result } from "../../../Shared/Utils/Result.js";
import { ValidationException } from "../../../Shared/Errors/ValidationException.js";
import { ErrorCatalog } from "../../../Shared/Errors/ErrorCatalog.js";
import { Prisma } from '@prisma/client';
import { GetUserQueryDTO } from "src/Domain/QueryDTO/GetUserQueryDTO.js";

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
<<<<<<< HEAD
  }

  public async GetAllUsers(): Promise<Result<GetUserViewModel[]>> {
    try {
      const getUserQueryDTOs: GetUserQueryDTO[] = await this.GetUserQueryHandler.GetAll();
      const getUserViewModels: GetUserViewModel[] = getUserQueryDTOs.map(dto => GetUserViewModel.FromQueryDTO(dto));
      
      return Result.SucessWithData<GetUserViewModel[]>("Users found", getUserViewModels);
    } catch (error) {
      if (error instanceof ValidationException) {
        const message: string = error.SetErrors();
        return Result.Failure<GetUserViewModel[]>(message);
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
      }
      return Result.Failure(ErrorCatalog.InternalServerError.SetError());
    }
  }
}
=======
}
>>>>>>> 5e8138dd314895855a87802351c8f5750698a22b
