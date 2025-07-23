import {BaseHandlerCommand} from "./BaseHandlerCommand";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {EditTournamentCommand} from "../CommandObject/EditTournamentCommand";
import {Tournament} from "../../Entities/Concrete/Tournament";

export class EditTournamentCommandHandler implements BaseHandlerCommand<EditTournamentCommand>
{
    constructor(private tournamentRepository: TournamentRepository, Notifcation: NotificationError)
    {
    }

    async Handle(command: EditTournamentCommand): Promise<void>
    {
        const tournament: Tournament | null = await this.tournamentRepository.GetTournamentEntityByUuid(command.tournamentUuid);

        await this.ChangeFields(tournament!, command);

        await this.tournamentRepository.Update(command.tournamentUuid, tournament);
    }

    private async ChangeFields(tournament: Tournament, command: EditTournamentCommand): Promise<void>
    {
       tournament.tournamentName = command.tournamentName;
       tournament.player1Username = command.player1Username;
       tournament.player2Username = command.player2Username;
       tournament.player3Username = command.player3Username;
       tournament.player4Username = command.player4Username;
    }
}