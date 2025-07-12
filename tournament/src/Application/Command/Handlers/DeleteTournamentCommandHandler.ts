import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {DeleteTournamentCommand} from "../CommandObject/DeleteTournamentCommand";


export class DeleteTournamentCommandHandler implements BaseHandlerCommand<DeleteTournamentCommand>
{
    constructor(private tournamentRepository: TournamentRepository, Notifcation: NotificationError)
    {
    }

    async Handle(command: DeleteTournamentCommand): Promise<void>
    {
        await this.tournamentRepository.Delete(command.tournamentUuid);
    }
}