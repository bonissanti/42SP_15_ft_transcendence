import {BaseController} from "./BaseController";
import {NotificationError} from "../../Shared/Errors/NotificationError";
import {FastifyReply, FastifyRequest} from "fastify";
import {GenerateMatchmakingDTO} from "../../Application/DTO/ToCommand/GenerateMatchmakingDTO";
import {MatchmakingService} from "../../Application/Services/Concrete/MatchmakingService";

export class MatchmakingController extends BaseController
{
    private readonly notificationError: NotificationError;
    private readonly matchMakingService: MatchmakingService;

    constructor()
    {
        super();
        this.notificationError = new NotificationError();
        this.matchMakingService = new MatchmakingService(this.notificationError);
    }

    public async GenerateMatchmaking(request: FastifyRequest<{ Querystring: GenerateMatchmakingDTO }>, reply: FastifyReply)
    {
        const query = request.query;
        const dto: GenerateMatchmakingDTO = new GenerateMatchmakingDTO(query.username, query.wins, query.totalGames);
        const result = await this.matchMakingService.Generate(dto, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
}