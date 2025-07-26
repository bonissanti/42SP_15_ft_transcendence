import {BaseService} from "../Interfaces/BaseService.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {FastifyReply} from "fastify";
import {GetUserQuery} from "../../../Domain/Queries/QueryObject/GetUserQuery.js";
import {GetUserQueryHandler} from "../../../Domain/Queries/Handlers/GetUserQueryHandler.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {GetUserViewModel} from "../../ViewModels/GetUserViewModel.js";
import {Result} from "../../../Shared/Utils/Result.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {Prisma} from '@prisma/client';
import {GetUserQueryDTO} from "../../../Domain/QueryDTO/GetUserQueryDTO.js";
import {GetUserDTO} from "../../DTO/ToQuery/GetUserDTO.js";
import {ErrorTypeEnum} from "../../Enums/ErrorTypeEnum.js";

export class GetUserService implements BaseService<GetUserDTO, GetUserViewModel> {
    private readonly UserRepository: UserRepository;
    private GetUserQueryHandler: GetUserQueryHandler;

    constructor(userRepository: UserRepository, notificationError: NotificationError) {
        this.UserRepository = userRepository;
        this.GetUserQueryHandler = new GetUserQueryHandler(this.UserRepository, notificationError);
    }

    public async GetUser(dto: GetUserDTO, reply: FastifyReply): Promise<Result<GetUserViewModel | null>>
    {
        try
        {
            let getUserViewModel: GetUserViewModel | null = null;

            const query: GetUserQuery = GetUserQuery.FromDTO(dto);
            // TODO: adicionar validator
            const getUserQueryDTO = await this.GetUserQueryHandler.Handle(query);

            if (!getUserQueryDTO)
                return Result.SucessWithData<GetUserViewModel | null>("User not found", getUserViewModel);

            getUserViewModel = GetUserViewModel.FromQueryDTO(getUserQueryDTO);
            return Result.SucessWithData<GetUserViewModel>("User found", getUserViewModel);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<GetUserViewModel>(message, ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum.CONFLICT);
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum.INTERNAL);
        }
    }

    public async GetAllUsers(): Promise<Result<GetUserViewModel[]>>
    {
        try {
            const getUserQueryDTOs: GetUserQueryDTO[] = await this.GetUserQueryHandler.GetAll();
            const getUserViewModels: GetUserViewModel[] = getUserQueryDTOs.map(dto => GetUserViewModel.FromQueryDTO(dto));

            return Result.SucessWithData<GetUserViewModel[]>("Users found", getUserViewModels);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<GetUserViewModel[]>(message, ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum.CONFLICT);
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum.INTERNAL);
        }
    }

    Execute(dto: GetUserDTO, reply: FastifyReply): Promise<Result<GetUserViewModel>> {
        throw new Error("Method not implemented.");
    }
}
