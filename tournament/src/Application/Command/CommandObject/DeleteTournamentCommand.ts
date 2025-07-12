import {DeleteTournamentDTO} from "../../DTO/ToCommand/DeleteTournamentDTO";

export class DeleteTournamentCommand
{
    public readonly tournamentUuid: string;

    constructor(tournamentUuid: string)
    {
        this.tournamentUuid = tournamentUuid;
    }

    public static fromDTO(dto: DeleteTournamentDTO): DeleteTournamentCommand
    {
        return new DeleteTournamentCommand(dto.torunamentUuid);
    }
}