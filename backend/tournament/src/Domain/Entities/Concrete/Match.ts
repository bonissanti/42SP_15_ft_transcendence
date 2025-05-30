import { IMatch } from "../Interface/IMatch";

export class Match implements IMatch
{
    public readonly Uuid: string;
    public readonly PlayerOne: string;
    public readonly PlayerTwo: string;
    public readonly ScoreOne: Number;
    public readonly ScoreTwo: Number;
    public readonly TournamentID: string | null = null;
    public readonly PlayerOneWin: boolean = false;

    constructor(PlayerOne: string,
                PlayerTwo: string,
                ScoreOne: Number,
                ScoreTwo: Number,
                TournamentID: string | null     
    )
    {
        this.Uuid = crypto.randomUUID();
        this.PlayerOne = PlayerOne;
        this.PlayerTwo = PlayerTwo;
        this.ScoreOne = ScoreOne;
        this.ScoreTwo = ScoreTwo;
        if (TournamentID != null)
            this.TournamentID = TournamentID;
        if (ScoreOne > ScoreTwo)
            this.PlayerOneWin = true;       
    }
}