import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {GenerateMatchmakingDTO} from "../../DTO/ToCommand/GenerateMatchmakingDTO";
import {FastifyReply} from "fastify";
import {GenerateMatchmakingQuery} from "../../../Domain/Queries/QueryObject/GenerateMatchmakingQuery";

export class MatchmakingService
{
    private readonly matchmakingCommandHandler: MatchmakingCommandHandler;
    private readonly matchmakingCommandValidator: MatchmakingCommandValidator;

    constructor(notificationError: NotificationError)
    {
        this.matchmakingCommandHandler = new MatchmakingCommandHandler(notificationError);
        this.matchmakingCommandValidator = new MatchmakingCommandValidator(notificationError);
    }

    public async Generate(dto: GenerateMatchmakingDTO, reply: FastifyReply): Promise<Result>
    {
        try
        {
            const command: GenerateMatchmakingQuery = GenerateMatchmakingQuery.fromDTO(dto);
            await this.
        }
    }
}