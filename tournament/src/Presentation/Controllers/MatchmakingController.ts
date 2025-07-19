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

    public async GenerateMatchmaking(request: FastifyRequest<{ Body: GenerateMatchmakingDTO }>, reply: FastifyReply)
    {
        const body = request.body;
        const dto: GenerateMatchmakingDTO = new GenerateMatchmakingDTO(body.username, body.wins, body.totalGames);
        const result = await this.matchMakingService.Generate(dto, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
}