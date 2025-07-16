import {BaseController} from "./BaseController";
import {NotificationError} from "../../Shared/Errors/NotificationError";
import {FastifyReply, FastifyRequest} from "fastify";
import {CreateTournamentDTO} from "../../Application/DTO/ToCommand/CreateTournamentDTO";
import {CreateHistoryDTO} from "../../Application/DTO/ToCommand/CreateHistoryDTO";
import {HistoryService} from "../../Application/Services/Concrete/HistoryService";
import {GetAllHistoriesDTO} from "../../Application/DTO/ToQuery/GetAllHistoriesDTO";

export class HistoryController extends BaseController
{
    private readonly notificationError: NotificationError;
    private readonly historyService: HistoryService;

    constructor()
    {
        super();
        this.notificationError = new NotificationError();
        this.historyService = new HistoryService(this.notificationError);
    }

    public async CreateHistory(request: FastifyRequest<{ Body: CreateHistoryDTO }>, reply: FastifyReply)
    {
        const body = request.body;
        const createHistoryDTO: CreateHistoryDTO = new CreateHistoryDTO(
            body.tournamentName ?? '',
            body.player1Username,
            body.player1Points,
            body.player2Username,
            body.player2Points)

        const result = await this.historyService.Create(createHistoryDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }

    public async GetAllHistories(request: FastifyRequest<{ Querystring: GetAllHistoriesDTO }>, reply: FastifyReply)
    {
        const query = request.query;
        const getAllHistoriesDTO: GetAllHistoriesDTO = new GetAllHistoriesDTO(query.username);
        const result = await this.historyService.GetAll(getAllHistoriesDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
}