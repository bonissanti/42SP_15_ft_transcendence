import {BaseHandlerCommand} from "./BaseHandlerCommand";
import {CreateHistoryCommand} from "../CommandObject/CreateHistoryCommand";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {History} from "../../Entities/Concrete/History";
import {HistoryRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/HistoryRepository";
import {BackendApiClient} from "../../../Infrastructure/Http/Concrete/BackendApiClient";

export class CreateHistoryCommandHandler implements BaseHandlerCommand<CreateHistoryCommand>
{
    private historyRepository: HistoryRepository;
    private backendApiClient: BackendApiClient;

    constructor(historyRepository: HistoryRepository, notification: NotificationError)
    {
        this.historyRepository = historyRepository;
        this.backendApiClient = new BackendApiClient();
    }

    async Handle(command: CreateHistoryCommand) : Promise<void>
    {
        const historyEntity: History = new History(
            command.tournamentName,
            command.player1Username,
            command.player1Points,
            command.player2Username,
            command.player2Points
        );

        await this.backendApiClient.AddWinLoseForUser(
            command.player1Username,
            command.player1Points,
            command.player2Username,
            command.player2Points
        )

        await this.historyRepository.Create(historyEntity);
    }
}