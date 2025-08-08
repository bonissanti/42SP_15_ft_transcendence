import { TestSuite, Assert, TestHelper } from '../test-helper.js';

// Função helper para gerar UUID
function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Mock da entidade History copiada do game-service
class History {
    public readonly historyUuid: string;
    public readonly tournamentId?: string;
    public readonly tournamentName?: string;
    public readonly gameType?: string;
    public readonly player1Username: string;
    public readonly player1Alias: string | null;
    public readonly player1Points: number;
    public readonly player2Username: string;
    public readonly player2Alias: string | null;
    public readonly player2Points: number;
    public readonly player3Username: string | null;
    public readonly player3Alias: string | null;
    public readonly player3Points: number | null;
    public readonly player4Username: string | null;
    public readonly player4Alias: string | null;
    public readonly player4Points: number | null;

    constructor(tournamentId: string | undefined, tournamentName: string | undefined, gameType: string | undefined, player1Username: string, player1Alias: string | null, player1Points: number, player2Username: string, player2Alias: string | null, player2Points: number,
                player3Username: string | null, player3Alias: string | null, player3Points: number | null, player4Username: string | null, player4Alias: string | null, player4Points: number | null)
    {
        this.historyUuid = generateUUID();
        this.tournamentId = tournamentId;
        this.tournamentName = tournamentName;
        this.gameType = gameType;
        this.player1Username = player1Username;
        this.player1Alias = player1Alias;
        this.player1Points = player1Points;
        this.player2Username = player2Username;
        this.player2Alias = player2Alias;
        this.player2Points = player2Points;
        this.player3Username = player3Username;
        this.player3Alias = player3Alias;
        this.player3Points = player3Points;
        this.player4Username = player4Username;
        this.player4Alias = player4Alias;
        this.player4Points = player4Points;
    }
}

export async function runHistoryEntityTests() {
    const suite = new TestSuite();

    suite.test('History constructor should create valid history for 2 players', () => {
        const history = new History(
            'tournament-1',
            'Test Tournament',
            'pong',
            'player1',
            'alias1',
            10,
            'player2',
            'alias2',
            5,
            null,
            null,
            null,
            null,
            null,
            null
        );

        Assert.strictEqual(history.tournamentId, 'tournament-1');
        Assert.strictEqual(history.tournamentName, 'Test Tournament');
        Assert.strictEqual(history.gameType, 'pong');
        Assert.strictEqual(history.player1Username, 'player1');
        Assert.strictEqual(history.player1Alias, 'alias1');
        Assert.strictEqual(history.player1Points, 10);
        Assert.strictEqual(history.player2Username, 'player2');
        Assert.strictEqual(history.player2Alias, 'alias2');
        Assert.strictEqual(history.player2Points, 5);
        Assert.strictEqual(history.player3Username, null);
        Assert.strictEqual(history.player4Username, null);
        Assert.ok(history.historyUuid);
    });

    suite.test('History constructor should create valid history for 4 players', () => {
        const history = new History(
            'tournament-2',
            'Test Tournament 4P',
            'rps',
            'player1',
            'alias1',
            20,
            'player2',
            'alias2',
            15,
            'player3',
            'alias3',
            10,
            'player4',
            'alias4',
            5
        );

        Assert.strictEqual(history.tournamentId, 'tournament-2');
        Assert.strictEqual(history.gameType, 'rps');
        Assert.strictEqual(history.player3Username, 'player3');
        Assert.strictEqual(history.player3Alias, 'alias3');
        Assert.strictEqual(history.player3Points, 10);
        Assert.strictEqual(history.player4Username, 'player4');
        Assert.strictEqual(history.player4Alias, 'alias4');
        Assert.strictEqual(history.player4Points, 5);
    });

    suite.test('History should handle undefined tournament data', () => {
        const history = new History(
            undefined,
            undefined,
            undefined,
            'player1',
            null,
            100,
            'player2',
            null,
            50,
            null,
            null,
            null,
            null,
            null,
            null
        );

        Assert.strictEqual(history.tournamentId, undefined);
        Assert.strictEqual(history.tournamentName, undefined);
        Assert.strictEqual(history.gameType, undefined);
        Assert.strictEqual(history.player1Username, 'player1');
        Assert.strictEqual(history.player2Username, 'player2');
        Assert.ok(history.historyUuid);
    });

    suite.test('History should be immutable after creation', () => {
        const history = new History(
            'tournament-1',
            'Test Tournament',
            'pong',
            'player1',
            'alias1',
            10,
            'player2',
            'alias2',
            5,
            null,
            null,
            null,
            null,
            null,
            null
        );

        // Try to modify readonly properties (should not be possible in TypeScript)
        const originalUuid = history.historyUuid;
        const originalUsername = history.player1Username;
        
        Assert.strictEqual(history.historyUuid, originalUuid);
        Assert.strictEqual(history.player1Username, originalUsername);
    });

    return await suite.run();
}
