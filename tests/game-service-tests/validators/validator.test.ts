import { TestSuite, Assert, TestHelper } from '../test-helper.js';

// Mock das classes de validação
class NotificationError {
    private errors: string[] = [];

    AddError(error: string): void {
        this.errors.push(error);
    }

    HasError(): boolean {
        return this.errors.length > 0;
    }

    GetErrors(): string[] {
        return this.errors;
    }

    Clear(): void {
        this.errors = [];
    }
}

class ValidationException extends Error {
    constructor(private notificationError: NotificationError) {
        super('Validation errors occurred');
    }

    SetErrors(): string {
        return this.notificationError.GetErrors().join(', ');
    }
}

class CreateTournamentCommand {
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

// Mock do repository
class MockTournamentRepository {
    async findByName(name: string): Promise<any> {
        if (name === 'Existing Tournament') {
            return { tournamentName: name };
        }
        return null;
    }
}

class CreateTournamentValidator {
    constructor(
        private tournamentRepository: MockTournamentRepository,
        private notificationError: NotificationError
    ) {}

    async Validator(command: CreateTournamentCommand): Promise<void> {
        this.notificationError.Clear();

        // Validate tournament name
        if (!command.tournamentName || command.tournamentName.trim() === '') {
            this.notificationError.AddError('Tournament name is required');
        }

        if (command.tournamentName && command.tournamentName.length > 50) {
            this.notificationError.AddError('Tournament name must be 50 characters or less');
        }

        // Validate players
        const players = [
            command.player1Username,
            command.player2Username, 
            command.player3Username,
            command.player4Username
        ];

        for (let i = 0; i < players.length; i++) {
            if (!players[i] || players[i].trim() === '') {
                this.notificationError.AddError(`Player ${i + 1} username is required`);
            }
        }

        // Check for duplicate players
        const uniquePlayers = new Set(players.filter(p => p && p.trim() !== ''));
        if (uniquePlayers.size !== players.filter(p => p && p.trim() !== '').length) {
            this.notificationError.AddError('All players must be unique');
        }

        // Check if tournament name already exists
        if (command.tournamentName) {
            const existingTournament = await this.tournamentRepository.findByName(command.tournamentName);
            if (existingTournament) {
                this.notificationError.AddError('Tournament name already exists');
            }
        }

        if (this.notificationError.HasError()) {
            throw new ValidationException(this.notificationError);
        }
    }
}

export async function runValidatorTests() {
    const suite = new TestSuite();

    suite.test('CreateTournamentValidator should pass with valid data', async () => {
        const notificationError = new NotificationError();
        const repository = new MockTournamentRepository();
        const validator = new CreateTournamentValidator(repository, notificationError);

        const command = new CreateTournamentCommand(
            'Valid Tournament',
            'player1',
            'player2',
            'player3',
            'player4',
            'alias1',
            'alias2',
            'alias3',
            'alias4'
        );

        // Should not throw
        await validator.Validator(command);
        Assert.strictEqual(notificationError.HasError(), false);
    });

    suite.test('CreateTournamentValidator should fail with empty tournament name', async () => {
        const notificationError = new NotificationError();
        const repository = new MockTournamentRepository();
        const validator = new CreateTournamentValidator(repository, notificationError);

        const command = new CreateTournamentCommand(
            '',
            'player1',
            'player2',
            'player3',
            'player4',
            null,
            null,
            null,
            null
        );

        try {
            await validator.Validator(command);
            Assert.fail('Expected validation to fail');
        } catch (error) {
            Assert.ok(error instanceof ValidationException);
            Assert.ok((error as ValidationException).SetErrors().includes('Tournament name is required'));
        }
    });

    suite.test('CreateTournamentValidator should fail with empty player username', async () => {
        const notificationError = new NotificationError();
        const repository = new MockTournamentRepository();
        const validator = new CreateTournamentValidator(repository, notificationError);

        const command = new CreateTournamentCommand(
            'Valid Tournament',
            '',
            'player2',
            'player3',
            'player4',
            null,
            null,
            null,
            null
        );

        try {
            await validator.Validator(command);
            Assert.fail('Expected validation to fail');
        } catch (error) {
            Assert.ok(error instanceof ValidationException);
            Assert.ok((error as ValidationException).SetErrors().includes('Player 1 username is required'));
        }
    });

    suite.test('CreateTournamentValidator should fail with duplicate players', async () => {
        const notificationError = new NotificationError();
        const repository = new MockTournamentRepository();
        const validator = new CreateTournamentValidator(repository, notificationError);

        const command = new CreateTournamentCommand(
            'Valid Tournament',
            'player1',
            'player1', // duplicate
            'player3',
            'player4',
            null,
            null,
            null,
            null
        );

        try {
            await validator.Validator(command);
            Assert.fail('Expected validation to fail');
        } catch (error) {
            Assert.ok(error instanceof ValidationException);
            Assert.ok((error as ValidationException).SetErrors().includes('All players must be unique'));
        }
    });

    suite.test('CreateTournamentValidator should fail with existing tournament name', async () => {
        const notificationError = new NotificationError();
        const repository = new MockTournamentRepository();
        const validator = new CreateTournamentValidator(repository, notificationError);

        const command = new CreateTournamentCommand(
            'Existing Tournament', // This will be found by mock repository
            'player1',
            'player2',
            'player3',
            'player4',
            null,
            null,
            null,
            null
        );

        try {
            await validator.Validator(command);
            Assert.fail('Expected validation to fail');
        } catch (error) {
            Assert.ok(error instanceof ValidationException);
            Assert.ok((error as ValidationException).SetErrors().includes('Tournament name already exists'));
        }
    });

    suite.test('CreateTournamentValidator should fail with too long tournament name', async () => {
        const notificationError = new NotificationError();
        const repository = new MockTournamentRepository();
        const validator = new CreateTournamentValidator(repository, notificationError);

        const longName = 'a'.repeat(51); // 51 characters
        const command = new CreateTournamentCommand(
            longName,
            'player1',
            'player2',
            'player3',
            'player4',
            null,
            null,
            null,
            null
        );

        try {
            await validator.Validator(command);
            Assert.fail('Expected validation to fail');
        } catch (error) {
            Assert.ok(error instanceof ValidationException);
            Assert.ok((error as ValidationException).SetErrors().includes('Tournament name must be 50 characters or less'));
        }
    });

    return await suite.run();
}
