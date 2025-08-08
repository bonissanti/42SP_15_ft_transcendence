import { TestSuite, Assert, TestHelper } from '../test-helper.js';

// Mock classes for controller testing
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

    Clear(): void {
        this.errors = [];
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

// Mock service
class MockCreateTournamentService {
    async Execute(dto: CreateTournamentDTO, reply: any): Promise<Result> {
        if (!dto.tournamentName) {
            return Result.Failure('Tournament name is required', 'VALIDATION');
        }
        if (dto.tournamentName === 'Existing Tournament') {
            return Result.Failure('Tournament already exists', 'CONFLICT');
        }
        return Result.Success('Tournament created successfully');
    }
}

// Mock controller
class TournamentController {
    private notificationError: NotificationError;

    constructor() {
        this.notificationError = new NotificationError();
    }

    async createTournament(request: any, reply: any): Promise<any> {
        try {
            const dto = new CreateTournamentDTO(
                request.body.tournamentName,
                request.body.player1Username,
                request.body.player2Username,
                request.body.player3Username,
                request.body.player4Username,
                request.body.aliasPlayer1 || null,
                request.body.aliasPlayer2 || null,
                request.body.aliasPlayer3 || null,
                request.body.aliasPlayer4 || null
            );

            const service = new MockCreateTournamentService();
            const result = await service.Execute(dto, reply);

            if (result.IsSuccess) {
                return reply.code(201).send({
                    success: true,
                    message: result.Message
                });
            } else {
                const statusCode = this.getStatusCodeFromErrorType(result.ErrorType);
                return reply.code(statusCode).send({
                    success: false,
                    message: result.Message
                });
            }
        } catch (error) {
            return reply.code(500).send({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    private getStatusCodeFromErrorType(errorType?: string): number {
        switch (errorType) {
            case 'VALIDATION':
                return 400;
            case 'CONFLICT':
                return 409;
            case 'NOT_FOUND':
                return 404;
            default:
                return 500;
        }
    }
}

export async function runControllerTests() {
    const suite = new TestSuite();

    suite.test('TournamentController should create tournament successfully', async () => {
        const controller = new TournamentController();
        
        const mockRequest = {
            body: {
                tournamentName: 'Test Tournament',
                player1Username: 'player1',
                player2Username: 'player2',
                player3Username: 'player3',
                player4Username: 'player4',
                aliasPlayer1: 'alias1',
                aliasPlayer2: 'alias2',
                aliasPlayer3: 'alias3',
                aliasPlayer4: 'alias4'
            }
        };

        let responseCode = 0;
        let responseData: any = null;

        const mockReply = {
            code: (code: number) => {
                responseCode = code;
                return mockReply;
            },
            send: (data: any) => {
                responseData = data;
                return data;
            }
        };

        await controller.createTournament(mockRequest, mockReply);

        Assert.strictEqual(responseCode, 201);
        Assert.strictEqual(responseData.success, true);
        Assert.strictEqual(responseData.message, 'Tournament created successfully');
    });

    suite.test('TournamentController should handle validation error', async () => {
        const controller = new TournamentController();
        
        const mockRequest = {
            body: {
                tournamentName: '', // Empty name
                player1Username: 'player1',
                player2Username: 'player2',
                player3Username: 'player3',
                player4Username: 'player4'
            }
        };

        let responseCode = 0;
        let responseData: any = null;

        const mockReply = {
            code: (code: number) => {
                responseCode = code;
                return mockReply;
            },
            send: (data: any) => {
                responseData = data;
                return data;
            }
        };

        await controller.createTournament(mockRequest, mockReply);

        Assert.strictEqual(responseCode, 400);
        Assert.strictEqual(responseData.success, false);
        Assert.ok(responseData.message.includes('Tournament name is required'));
    });

    suite.test('TournamentController should handle conflict error', async () => {
        const controller = new TournamentController();
        
        const mockRequest = {
            body: {
                tournamentName: 'Existing Tournament',
                player1Username: 'player1',
                player2Username: 'player2',
                player3Username: 'player3',
                player4Username: 'player4'
            }
        };

        let responseCode = 0;
        let responseData: any = null;

        const mockReply = {
            code: (code: number) => {
                responseCode = code;
                return mockReply;
            },
            send: (data: any) => {
                responseData = data;
                return data;
            }
        };

        await controller.createTournament(mockRequest, mockReply);

        Assert.strictEqual(responseCode, 409);
        Assert.strictEqual(responseData.success, false);
        Assert.ok(responseData.message.includes('Tournament already exists'));
    });

    suite.test('TournamentController should handle missing request body', async () => {
        const controller = new TournamentController();
        
        const mockRequest = {
            body: null // Missing body
        };

        let responseCode = 0;
        let responseData: any = null;

        const mockReply = {
            code: (code: number) => {
                responseCode = code;
                return mockReply;
            },
            send: (data: any) => {
                responseData = data;
                return data;
            }
        };

        await controller.createTournament(mockRequest, mockReply);

        Assert.strictEqual(responseCode, 500);
        Assert.strictEqual(responseData.success, false);
        Assert.strictEqual(responseData.message, 'Internal server error');
    });

    return await suite.run();
}
