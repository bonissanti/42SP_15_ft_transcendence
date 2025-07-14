import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {EditTournamentCommand} from "../CommandObject/EditTournamentCommand";
import {Tournament} from "../../../Domain/Entities/Concrete/Tournament";

export class EditTournamentCommandHandler implements BaseHandlerCommand<EditTournamentCommand>
{
    constructor(private tournamentRepository: TournamentRepository, Notifcation: NotificationError)
    {
    }

    async Handle(command: EditTournamentCommand): Promise<void>
    {
        const tournament: Tournament | null = await this.tournamentRepository.GetTournamentEntityByUuid(command.torunamentUuid);

        await this.ChangeFields(tournament!, command);

        await this.tournamentRepository.Update(command.torunamentUuid, tournament);
    }

    private async ChangeFields(tournament: Tournament, command: EditTournamentCommand): Promise<void>
    {
       tournament.tournamentName = command.tournamentName;
       tournament.player1Uuid = command.player1Uuid;
       tournament.player2Uuid = command.player2Uuid;
       tournament.player3Uuid = command.player3Uuid;
       tournament.player4Uuid = command.player4Uuid;
    }
}