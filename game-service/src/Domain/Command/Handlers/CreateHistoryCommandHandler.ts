import {BaseHandlerCommand} from "./BaseHandlerCommand";
import {CreateHistoryCommand} from "../CommandObject/CreateHistoryCommand";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {History} from "../../Entities/Concrete/History";
import {HistoryRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/HistoryRepository";
import {UserServiceClient} from "../../../Infrastructure/Http/Concrete/UserServiceClient";
import {UpdateStatsExternalDTO} from "../../ExternalDTO/UpdateStatsExternalDTO";

export class CreateHistoryCommandHandler implements BaseHandlerCommand<CreateHistoryCommand>
{
    private historyRepository: HistoryRepository;
    private backendApiClient: UserServiceClient;

    constructor(historyRepository: HistoryRepository, notification: NotificationError)
    {
        this.historyRepository = historyRepository;
        this.backendApiClient = new UserServiceClient();
    }

    async Handle(command: CreateHistoryCommand) : Promise<void>
    {
        const historyEntity: History = new History(
            command.tournamentId,
            command.tournamentName,
            command.gameType.toString(),
            command.player1Username,
            command.player1Alias,
            command.player1Points,
            command.player2Username,
            command.player2Alias,
            command.player2Points,
            command.player3Username,
            command.player3Alias,
            command.player3Points,
            command.player4Username,
            command.player4Alias,
            command.player4Points
        );

        const addStatsAfterMatch: UpdateStatsExternalDTO = new UpdateStatsExternalDTO(
            command.gameType,
            command.player1Username,
            command.player1Points,
            command.player2Username,
            command.player2Points,
            command.player3Username,
            command.player3Points,
            command.player4Username,
            command.player4Points
        );
        await this.backendApiClient.UpdateStatsForUsers(addStatsAfterMatch);
        await this.historyRepository.Create(historyEntity);
    }
}