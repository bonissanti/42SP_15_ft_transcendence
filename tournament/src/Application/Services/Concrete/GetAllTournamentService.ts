import {BaseService} from "../Interfaces/BaseService.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {FastifyReply} from "fastify";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {Result} from "../../../Shared/Utils/Result.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {Prisma} from '@prisma/client';
import {GetAllTournamentsDTO} from "../../DTO/ToQuery/GetAllTournamentsDTO";
import {GetAllTournamentsQuery} from "../../Queries/QueryObject/GetAllTournamentsQuery";
import {GetAllTournamentsViewModel} from "../../ViewModel/GetAllTournamentsViewModel";
import {GetAllTournamentQueryHandler} from "../../Queries/Handlers/GetAllTournamentQueryHandler";
import {GetAllTournamentsQueryDTO} from "../../../Domain/QueryDTO/GetAllTournamentsQueryDTO";

export class GetAllTournamentService implements BaseService<GetAllTournamentsDTO, GetAllTournamentsViewModel[]>
{
    private tournamentRepository: TournamentRepository;
    private GetUserQueryHandler: GetAllTournamentQueryHandler;

    constructor(notificationError: NotificationError)
    {
        this.tournamentRepository = new TournamentRepository();
        this.GetUserQueryHandler = new GetAllTournamentQueryHandler(this.tournamentRepository, notificationError);
    }

    public async Execute(dto: GetAllTournamentsDTO, reply: FastifyReply): Promise<Result<GetAllTournamentsViewModel[]>>
    {
        try
        {
            const query: GetAllTournamentsQuery = GetAllTournamentsQuery.fromDTO(dto);
            const getAllTournamentsQueryDTO: GetAllTournamentsQueryDTO[] | null = await this.GetUserQueryHandler.Handle(query);

            if (!getAllTournamentsQueryDTO) {
                return Result.Failure<GetAllTournamentsViewModel[]>(ErrorCatalog.UserNotFound.SetError());
            }

            const getAllTournamentsViewModel = GetAllTournamentsViewModel.fromQueryDTOlist(getAllTournamentsQueryDTO);
            return Result.SucessWithData<GetAllTournamentsViewModel[]>("Tournaments found", getAllTournamentsViewModel);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<GetAllTournamentsViewModel[]>(message);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }
}
