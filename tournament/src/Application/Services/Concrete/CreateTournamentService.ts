import { BaseService } from "../Interfaces/BaseService.js";
import { FastifyReply } from "fastify";
import { Result } from "../../../Shared/Utils/Result.js";
import { ErrorCatalog } from "../../../Shared/Errors/ErrorCatalog.js";
import { TournamentRepository } from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import { CreateTournamentCommandHandler } from "../../../Domain/Command/Handlers/CreateTournamentCommandHandler.js";
import { CreateTournamentValidator } from "../../../Domain/Command/Validators/CreateTournamentValidator.js";
import { NotificationError } from "../../../Shared/Errors/NotificationError.js";
import { ValidationException } from "../../../Shared/Errors/ValidationException.js";
import { Prisma } from "@prisma/client";
import {CreateTournamentDTO} from "../../DTO/ToCommand/CreateTournamentDTO";
import {CreateTournamentCommand} from "../../../Domain/Command/CommandObject/CreateTournamentCommand";

export class CreateTournamentService implements BaseService<CreateTournamentDTO>
{
    private readonly tournamentRepository: TournamentRepository;
    private createTournamentCommandHandler: CreateTournamentCommandHandler;
    private createTournamentValidator: CreateTournamentValidator;

    constructor(notificationError: NotificationError)
    {
        this.tournamentRepository = new TournamentRepository();
        this.createTournamentValidator = new CreateTournamentValidator(this.tournamentRepository, notificationError);
        this.createTournamentCommandHandler = new CreateTournamentCommandHandler(this.tournamentRepository, notificationError);
    }

    public async Execute(dto: CreateTournamentDTO, reply: FastifyReply): Promise<Result>
    {
        try {
            const command: CreateTournamentCommand = CreateTournamentCommand.fromDTO(dto);
            await this.createTournamentValidator.Validator(command);
            await this.createTournamentCommandHandler.Handle(command);

            return Result.Sucess("Tournament created successfully");
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message);
            }

            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }
}
