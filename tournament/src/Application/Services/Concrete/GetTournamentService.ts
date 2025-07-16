import {BaseService} from "../Interfaces/BaseService.js";
import {FastifyReply} from "fastify";
import {Result} from "../../../Shared/Utils/Result.js";
import {Prisma} from '@prisma/client';
import {GetTournamentDTO} from "../../DTO/ToQuery/GetTournamentDTO";
import {GetTournamentQuery} from "../../../Domain/Queries/QueryObject/GetTournamentQuery";
import {GetTournamentViewModel} from "../../ViewModel/GetTournamentViewModel";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository";
import {GetTournamentQueryHandler} from "../../../Domain/Queries/Handlers/GetTournamentQueryHandler";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog";
import {ValidationException} from "../../../Shared/Errors/ValidationException";
import {NotificationError} from "../../../Shared/Errors/NotificationError";

export class GetTournamentService implements BaseService<GetTournamentDTO, GetTournamentViewModel>

{
    private tournamentRepository: TournamentRepository;
    private getTournamentQueryHandler: GetTournamentQueryHandler;

    constructor(notificationError: NotificationError)
    {
        this.tournamentRepository = new TournamentRepository();
        this.getTournamentQueryHandler = new GetTournamentQueryHandler(this.tournamentRepository, notificationError);
    }

    public async Execute(dto: GetTournamentDTO, reply: FastifyReply): Promise<Result<GetTournamentViewModel>>
    {
        try
        {
            const query: GetTournamentQuery = GetTournamentQuery.fromDTO(dto);
            const getUserQueryDTO = await this.getTournamentQueryHandler.Handle(query);

            if (!getUserQueryDTO) {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }

            const getTournamentViewModel = GetTournamentViewModel.fromQueryDTO(getUserQueryDTO);
            return Result.SucessWithData<GetTournamentViewModel>("Tournament found", getTournamentViewModel);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<GetTournamentViewModel>(message);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }
}
