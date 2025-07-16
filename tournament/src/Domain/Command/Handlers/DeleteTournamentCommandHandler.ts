import {BaseHandlerCommand} from "./BaseHandlerCommand";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository";
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