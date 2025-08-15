import { TestSuite, Assert, TestHelper } from '../test-helper.js';

// Mock dos DTOs do game-service
class CreateTournamentDTO {
    constructor(
        public readonly tournamentName: string,
        public readonly player1Username: string,
        public readonly player2Username: string,
        public readonly player3Username: string,
        public readonly player4Username: string,
        public readonly aliasPlayer1: string | null,
        public readonly aliasPlayer2: string | null,
        public readonly aliasPlayer3: string | null,
        public readonly aliasPlayer4: string | null
    ) {}
}

class CreateHistoryDTO {
    constructor(
        public readonly tournamentId: string | undefined,
        public readonly tournamentName: string | undefined,
        public readonly gameType: string | undefined,
        public readonly player1Username: string,
        public readonly player1Alias: string | null,
        public readonly player1Points: number,
        public readonly player2Username: string,
        public readonly player2Alias: string | null,
        public readonly player2Points: number,
        public readonly player3Username: string | null,
        public readonly player3Alias: string | null,
        public readonly player3Points: number | null,
        public readonly player4Username: string | null,
        public readonly player4Alias: string | null,
        public readonly player4Points: number | null
    ) {}
}

class GetTournamentDTO {
    constructor(
        public readonly tournamentUuid: string
    ) {}
}

export async function runDTOTests() {
    const suite = new TestSuite();

    suite.test('CreateTournamentDTO should create valid DTO', () => {
        const dto = new CreateTournamentDTO(
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

        Assert.strictEqual(dto.tournamentName, 'Test Tournament');
        Assert.strictEqual(dto.player1Username, 'player1');
        Assert.strictEqual(dto.player2Username, 'player2');
        Assert.strictEqual(dto.player3Username, 'player3');
        Assert.strictEqual(dto.player4Username, 'player4');
        Assert.strictEqual(dto.aliasPlayer1, 'alias1');
        Assert.strictEqual(dto.aliasPlayer2, 'alias2');
        Assert.strictEqual(dto.aliasPlayer3, 'alias3');
        Assert.strictEqual(dto.aliasPlayer4, 'alias4');
    });

    suite.test('CreateTournamentDTO should handle null aliases', () => {
        const dto = new CreateTournamentDTO(
            'Tournament No Alias',
            'player1',
            'player2',
            'player3',
            'player4',
            null,
            null,
            null,
            null
        );

        Assert.strictEqual(dto.tournamentName, 'Tournament No Alias');
        Assert.strictEqual(dto.aliasPlayer1, null);
        Assert.strictEqual(dto.aliasPlayer2, null);
        Assert.strictEqual(dto.aliasPlayer3, null);
        Assert.strictEqual(dto.aliasPlayer4, null);
    });

    suite.test('CreateHistoryDTO should create valid DTO for 2 players', () => {
        const dto = new CreateHistoryDTO(
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

        Assert.strictEqual(dto.tournamentId, 'tournament-1');
        Assert.strictEqual(dto.tournamentName, 'Test Tournament');
        Assert.strictEqual(dto.gameType, 'pong');
        Assert.strictEqual(dto.player1Username, 'player1');
        Assert.strictEqual(dto.player1Points, 10);
        Assert.strictEqual(dto.player2Username, 'player2');
        Assert.strictEqual(dto.player2Points, 5);
        Assert.strictEqual(dto.player3Username, null);
        Assert.strictEqual(dto.player4Username, null);
    });

    suite.test('CreateHistoryDTO should create valid DTO for 4 players', () => {
        const dto = new CreateHistoryDTO(
            'tournament-2',
            'Tournament 4P',
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

        Assert.strictEqual(dto.player3Username, 'player3');
        Assert.strictEqual(dto.player3Points, 10);
        Assert.strictEqual(dto.player4Username, 'player4');
        Assert.strictEqual(dto.player4Points, 5);
    });

    suite.test('GetTournamentDTO should create valid DTO', () => {
        const uuid = 'test-uuid-123';
        const dto = new GetTournamentDTO(uuid);

        Assert.strictEqual(dto.tournamentUuid, uuid);
    });

    suite.test('CreateHistoryDTO should handle undefined tournament data', () => {
        const dto = new CreateHistoryDTO(
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

        Assert.strictEqual(dto.tournamentId, undefined);
        Assert.strictEqual(dto.tournamentName, undefined);
        Assert.strictEqual(dto.gameType, undefined);
        Assert.strictEqual(dto.player1Username, 'player1');
        Assert.strictEqual(dto.player2Username, 'player2');
    });

    return await suite.run();
}
