import { TestSuite, Assert, TestHelper } from '../test-helper.js';

// Mock da entidade Tournament copiada do game-service
class Tournament {
    public tournamentUuid: string;
    public tournamentName: string;
    public player1Username: string;
    public player2Username: string;
    public player3Username: string;
    public player4Username: string;
    public aliasPlayer1: string | null;
    public aliasPlayer2: string | null;
    public aliasPlayer3: string | null;
    public aliasPlayer4: string | null;

    constructor(tournamentName: string, player1Username: string, player2Username: string, player3Username: string, player4Username: string,
                aliasPlayer1: string | null, aliasPlayer2: string | null, aliasPlayer3: string | null, aliasPlayer4: string | null)
    {
        this.tournamentUuid = crypto.randomUUID();
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

    public static fromDatabase(tournamentUuid: string, tournamentName: string, player1Username: string, player2Username: string, player3Username: string, player4Username: string,
                aliasPlayer1: string | null, aliasPlayer2: string | null, aliasPlayer3: string | null, aliasPlayer4: string | null): Tournament
    {
        const tournament = Object.create(Tournament.prototype);
        tournament.tournamentUuid = tournamentUuid;
        tournament.tournamentName = tournamentName;
        tournament.player1Username = player1Username;
        tournament.player2Username = player2Username;
        tournament.player3Username = player3Username;
        tournament.player4Username = player4Username;
        tournament.aliasPlayer1 = aliasPlayer1;
        tournament.aliasPlayer2 = aliasPlayer2;
        tournament.aliasPlayer3 = aliasPlayer3;
        tournament.aliasPlayer4 = aliasPlayer4;
        return tournament;
    }
}

export async function runTournamentEntityTests() {
    const suite = new TestSuite();

    suite.test('Tournament constructor should create valid tournament', () => {
        const tournament = new Tournament(
            'Test Tournament',
            'player1',
            'player2', 
            'player3',
            'player4',
            'alias1',
            'alias2',
            'alias3',
            'alias4'
        );

        Assert.strictEqual(tournament.tournamentName, 'Test Tournament');
        Assert.strictEqual(tournament.player1Username, 'player1');
        Assert.strictEqual(tournament.player2Username, 'player2');
        Assert.strictEqual(tournament.player3Username, 'player3');
        Assert.strictEqual(tournament.player4Username, 'player4');
        Assert.strictEqual(tournament.aliasPlayer1, 'alias1');
        Assert.strictEqual(tournament.aliasPlayer2, 'alias2');
        Assert.strictEqual(tournament.aliasPlayer3, 'alias3');
        Assert.strictEqual(tournament.aliasPlayer4, 'alias4');
        Assert.ok(tournament.tournamentUuid);
    });

    suite.test('Tournament fromDatabase should create tournament with provided UUID', () => {
        const testUuid = 'test-uuid-123';
        const tournament = Tournament.fromDatabase(
            testUuid,
            'DB Tournament',
            'dbPlayer1',
            'dbPlayer2',
            'dbPlayer3', 
            'dbPlayer4',
            null,
            null,
            null,
            null
        );

        Assert.strictEqual(tournament.tournamentUuid, testUuid);
        Assert.strictEqual(tournament.tournamentName, 'DB Tournament');
        Assert.strictEqual(tournament.player1Username, 'dbPlayer1');
        Assert.strictEqual(tournament.aliasPlayer1, null);
    });

    suite.test('Tournament should handle null aliases', () => {
        const tournament = new Tournament(
            'Null Alias Tournament',
            'player1',
            'player2',
            'player3',
            'player4',
            null,
            null,
            null,
            null
        );

        Assert.strictEqual(tournament.aliasPlayer1, null);
        Assert.strictEqual(tournament.aliasPlayer2, null);
        Assert.strictEqual(tournament.aliasPlayer3, null);
        Assert.strictEqual(tournament.aliasPlayer4, null);
    });

    return await suite.run();
}
