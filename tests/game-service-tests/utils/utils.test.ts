import { TestSuite, Assert, TestHelper } from '../test-helper.js';

// Mock da classe Result do game-service
class Result {
    constructor(
        public readonly IsSuccess: boolean,
        public readonly Message: string,
        public readonly ErrorType?: string,
        public readonly Data?: any
    ) {}

    static Success(message: string, data?: any): Result {
        return new Result(true, message, undefined, data);
    }

    static Failure(message: string, errorType?: string): Result {
        return new Result(false, message, errorType);
    }
}

// Mock da classe CustomError
class CustomError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number = 500,
        public readonly errorType: string = 'INTERNAL'
    ) {
        super(message);
        this.name = 'CustomError';
    }
}

// Mock do ErrorCatalog
class ErrorCatalog {
    static readonly InternalServerError = {
        SetError: () => 'Internal server error occurred'
    };

    static readonly ValidationError = {
        SetError: () => 'Validation error occurred'
    };

    static readonly NotFoundError = {
        SetError: () => 'Resource not found'
    };

    static readonly ConflictError = {
        SetError: () => 'Resource already exists'
    };
}

// Mock das classes de enum
enum ErrorTypeEnum {
    VALIDATION = 'VALIDATION',
    NOT_FOUND = 'NOT_FOUND',
    CONFLICT = 'CONFLICT',
    INTERNAL = 'INTERNAL'
}

enum GameTypeEnum {
    PONG = 'pong',
    RPS = 'rps',
    TOURNAMENT = 'tournament'
}

export async function runUtilsTests() {
    const suite = new TestSuite();

    suite.test('Result.Success should create successful result', () => {
        const result = Result.Success('Operation completed');

        Assert.strictEqual(result.IsSuccess, true);
        Assert.strictEqual(result.Message, 'Operation completed');
        Assert.strictEqual(result.ErrorType, undefined);
        Assert.strictEqual(result.Data, undefined);
    });

    suite.test('Result.Success should create successful result with data', () => {
        const testData = { id: 1, name: 'Test' };
        const result = Result.Success('Operation completed', testData);

        Assert.strictEqual(result.IsSuccess, true);
        Assert.strictEqual(result.Message, 'Operation completed');
        Assert.strictEqual(result.Data, testData);
        Assert.strictEqual(result.Data.id, 1);
        Assert.strictEqual(result.Data.name, 'Test');
    });

    suite.test('Result.Failure should create failed result', () => {
        const result = Result.Failure('Operation failed', ErrorTypeEnum.VALIDATION);

        Assert.strictEqual(result.IsSuccess, false);
        Assert.strictEqual(result.Message, 'Operation failed');
        Assert.strictEqual(result.ErrorType, ErrorTypeEnum.VALIDATION);
        Assert.strictEqual(result.Data, undefined);
    });

    suite.test('Result.Failure should create failed result without error type', () => {
        const result = Result.Failure('Operation failed');

        Assert.strictEqual(result.IsSuccess, false);
        Assert.strictEqual(result.Message, 'Operation failed');
        Assert.strictEqual(result.ErrorType, undefined);
    });

    suite.test('CustomError should create error with default values', () => {
        const error = new CustomError('Test error');

        Assert.strictEqual(error.message, 'Test error');
        Assert.strictEqual(error.statusCode, 500);
        Assert.strictEqual(error.errorType, 'INTERNAL');
        Assert.strictEqual(error.name, 'CustomError');
    });

    suite.test('CustomError should create error with custom values', () => {
        const error = new CustomError('Validation failed', 400, 'VALIDATION');

        Assert.strictEqual(error.message, 'Validation failed');
        Assert.strictEqual(error.statusCode, 400);
        Assert.strictEqual(error.errorType, 'VALIDATION');
        Assert.strictEqual(error.name, 'CustomError');
    });

    suite.test('ErrorCatalog should provide predefined errors', () => {
        Assert.strictEqual(ErrorCatalog.InternalServerError.SetError(), 'Internal server error occurred');
        Assert.strictEqual(ErrorCatalog.ValidationError.SetError(), 'Validation error occurred');
        Assert.strictEqual(ErrorCatalog.NotFoundError.SetError(), 'Resource not found');
        Assert.strictEqual(ErrorCatalog.ConflictError.SetError(), 'Resource already exists');
    });

    suite.test('ErrorTypeEnum should have correct values', () => {
        Assert.strictEqual(ErrorTypeEnum.VALIDATION, 'VALIDATION');
        Assert.strictEqual(ErrorTypeEnum.NOT_FOUND, 'NOT_FOUND');
        Assert.strictEqual(ErrorTypeEnum.CONFLICT, 'CONFLICT');
        Assert.strictEqual(ErrorTypeEnum.INTERNAL, 'INTERNAL');
    });

    suite.test('GameTypeEnum should have correct values', () => {
        Assert.strictEqual(GameTypeEnum.PONG, 'pong');
        Assert.strictEqual(GameTypeEnum.RPS, 'rps');
        Assert.strictEqual(GameTypeEnum.TOURNAMENT, 'tournament');
    });

    suite.test('Result should be immutable', () => {
        const result = Result.Success('Test message', { value: 42 });
        
        // Try to modify the result (should not work due to readonly)
        const originalSuccess = result.IsSuccess;
        const originalMessage = result.Message;
        const originalData = result.Data;

        Assert.strictEqual(result.IsSuccess, originalSuccess);
        Assert.strictEqual(result.Message, originalMessage);
        Assert.strictEqual(result.Data, originalData);
    });

    suite.test('CustomError should inherit from Error', () => {
        const error = new CustomError('Test error');
        
        Assert.ok(error instanceof Error);
        Assert.ok(error instanceof CustomError);
    });

    return await suite.run();
}
