import {CreateTournamentDTO} from "../../../Application/DTO/ToCommand/CreateTournamentDTO";

export class CreateTournamentCommand
{
    public readonly tournamentName: string;
    public readonly player1Username: string;
    public readonly player2Username: string;
    public readonly player3Username: string;
    public readonly player4Username: string;
    public readonly aliasPlayer1: string | null;
    public readonly aliasPlayer2: string | null;
    public readonly aliasPlayer3: string | null;
    public readonly aliasPlayer4: string | null;

    constructor(tournamentName: string, player1Username: string, player2Username: string, player3Username: string, player4Username: string,
                aliasPlayer1: string | null, aliasPlayer2: string | null, aliasPlayer3: string | null, aliasPlayer4: string | null)
    {
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player2Username = player2Username;
        this.player3Username = player3Username;
        this.player4Username = player4Username;
        this.aliasPlayer1 = aliasPlayer1;
        this.aliasPlayer2 = aliasPlayer2;
        this.aliasPlayer3 = aliasPlayer3;
        this.aliasPlayer4 = aliasPlayer4;
    }

    public static fromDTO(dto: CreateTournamentDTO): CreateTournamentCommand
    {
        return new CreateTournamentCommand(dto.tournamentName, dto.player1Username, dto.player2Username, dto.player3Username, dto.player4Username,
            dto.aliasPlayer1, dto.aliasPlayer2, dto.aliasPlayer3, dto.aliasPlayer4);
    }
}