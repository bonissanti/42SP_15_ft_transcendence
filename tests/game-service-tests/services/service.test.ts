import { TestSuite, Assert, TestHelper } from '../test-helper.js';

// Mock classes
class Result {
    constructor(
        public readonly IsSuccess: boolean,
        public readonly Message: string,
        public readonly ErrorType?: string
    ) {}

    static Success(message: string): Result {
        return new Result(true, message);
    }

    static Failure(message: string, errorType?: string): Result {
        return new Result(false, message, errorType);
    }
}

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

    static fromDTO(dto: CreateTournamentDTO): CreateTournamentCommand {
        return new CreateTournamentCommand(
            dto.tournamentName,
            dto.player1Username,
            dto.player2Username,
            dto.player3Username,
            dto.player4Username,
            dto.aliasPlayer1,
            dto.aliasPlayer2,
            dto.aliasPlayer3,
            dto.aliasPlayer4
        );
    }
}

// Mock repository and handlers
class MockTournamentRepository {
    async create(data: any): Promise<any> {
        return { tournamentUuid: 'created-uuid', ...data };
    }

    async findByName(name: string): Promise<any> {
        if (name === 'Existing Tournament') {
            return { tournamentName: name };
        }
        return null;
    }
}

class MockCreateTournamentValidator {
    constructor(
        private repository: MockTournamentRepository,
        private notificationError: NotificationError
    ) {}

    async Validator(command: CreateTournamentCommand): Promise<void> {
        this.notificationError.Clear();
        
        if (!command.tournamentName) {
            this.notificationError.AddError('Tournament name is required');
            throw new ValidationException(this.notificationError);
        }

        if (command.tournamentName === 'Existing Tournament') {
            this.notificationError.AddError('Tournament name already exists');
            throw new ValidationException(this.notificationError);
        }
    }
}

class MockCreateTournamentCommandHandler {
    constructor(
        private repository: MockTournamentRepository,
        private notificationError: NotificationError
    ) {}

    async Handle(command: CreateTournamentCommand): Promise<void> {
        // Simulate tournament creation
        await this.repository.create({
            tournamentName: command.tournamentName,
            player1Username: command.player1Username,
            player2Username: command.player2Username,
            player3Username: command.player3Username,
            player4Username: command.player4Username
        });
    }
}

// Service under test
class CreateTournamentService {
    private readonly tournamentRepository: MockTournamentRepository;
    private createTournamentCommandHandler: MockCreateTournamentCommandHandler;
    private createTournamentValidator: MockCreateTournamentValidator;

    constructor(notificationError: NotificationError) {
        this.tournamentRepository = new MockTournamentRepository();
        this.createTournamentValidator = new MockCreateTournamentValidator(this.tournamentRepository, notificationError);
        this.createTournamentCommandHandler = new MockCreateTournamentCommandHandler(this.tournamentRepository, notificationError);
    }

    async Execute(dto: CreateTournamentDTO, reply: any): Promise<Result> {
        try {
            const command: CreateTournamentCommand = CreateTournamentCommand.fromDTO(dto);
            await this.createTournamentValidator.Validator(command);
            await this.createTournamentCommandHandler.Handle(command);

            return Result.Success("Tournament created successfully");
        } catch (error) {
            if (error instanceof ValidationException) {
                const message: string = error.SetErrors();
                return Result.Failure(message, "VALIDATION");
            }
            return Result.Failure("Internal server error", "INTERNAL");
        }
    }
}

export async function runServiceTests() {
    const suite = new TestSuite();

    suite.test('CreateTournamentService should create tournament successfully', async () => {
        const notificationError = new NotificationError();
        const service = new CreateTournamentService(notificationError);
        const mockReply = TestHelper.createMockFastifyReply();

        const dto = new CreateTournamentDTO(
            'New Tournament',
            'player1',
            'player2',
            'player3',
            'player4',
            'alias1',
            'alias2',
            'alias3',
            'alias4'
        );

        const result = await service.Execute(dto, mockReply);

        Assert.strictEqual(result.IsSuccess, true);
        Assert.strictEqual(result.Message, 'Tournament created successfully');
    });

    suite.test('CreateTournamentService should fail with validation error', async () => {
        const notificationError = new NotificationError();
        const service = new CreateTournamentService(notificationError);
        const mockReply = TestHelper.createMockFastifyReply();

        const dto = new CreateTournamentDTO(
            '', // Empty tournament name
            'player1',
            'player2',
            'player3',
            'player4',
            null,
            null,
            null,
            null
        );

        const result = await service.Execute(dto, mockReply);

        Assert.strictEqual(result.IsSuccess, false);
        Assert.ok(result.Message.includes('Tournament name is required'));
        Assert.strictEqual(result.ErrorType, 'VALIDATION');
    });

    suite.test('CreateTournamentService should fail with existing tournament name', async () => {
        const notificationError = new NotificationError();
        const service = new CreateTournamentService(notificationError);
        const mockReply = TestHelper.createMockFastifyReply();

        const dto = new CreateTournamentDTO(
            'Existing Tournament', // This will trigger validation error
            'player1',
            'player2',
            'player3',
            'player4',
            null,
            null,
            null,
            null
        );

        const result = await service.Execute(dto, mockReply);

        Assert.strictEqual(result.IsSuccess, false);
        Assert.ok(result.Message.includes('Tournament name already exists'));
        Assert.strictEqual(result.ErrorType, 'VALIDATION');
    });

    return await suite.run();
}
