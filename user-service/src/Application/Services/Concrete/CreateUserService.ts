import { CreateUserDTO } from "../../DTO/ToCommand/CreateUserDTO.js";
import { BaseService } from "../Interfaces/BaseService.js";
import { FastifyReply } from "fastify";
import { Result } from "../../../Shared/Utils/Result.js";
import { ErrorCatalog } from "../../../Shared/Errors/ErrorCatalog.js";
import { CreateUserCommand } from "../../../Domain/Command/CommandObject/CreateUserCommand.js";
import { UserRepository } from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import { CreateUserCommandHandler } from "../../../Domain/Command/Handlers/CreateUserCommandHandler.js";
import { CreateUserCommandValidator } from "../../../Domain/Command/Validators/CreateUserCommandValidator.js";
import { NotificationError } from "../../../Shared/Errors/NotificationError.js";
import { ValidationException } from "../../../Shared/Errors/ValidationException.js";
import { Prisma } from "@prisma/client";

export class CreateUserService implements BaseService<CreateUserDTO> {
    private readonly UserRepository: UserRepository;
    private CreateUserHandler: CreateUserCommandHandler;
    private CreateUserValidator: CreateUserCommandValidator;

    constructor(userRepository: UserRepository, notificationError: NotificationError) {
        this.UserRepository = userRepository;
        this.CreateUserValidator = new CreateUserCommandValidator(this.UserRepository, notificationError);
        this.CreateUserHandler = new CreateUserCommandHandler(this.UserRepository, notificationError);
    }

    public async Execute(dto: CreateUserDTO, reply: FastifyReply): Promise<Result>
    {
        try
        {
            const command: CreateUserCommand = CreateUserCommand.FromDTO(dto);
            await this.CreateUserValidator.Validator(command);
            await this.CreateUserHandler.Handle(command);

            return Result.Sucess("User created successfully");
        } catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                if (error.code === 'P2002') {
                    const target = error.meta?.target as string[];

                    if (target?.includes('username')) {
                        return Result.Failure(ErrorCatalog.UsernameAlreadyExists.SetError());
                    }

                    if (target?.includes('email')) {
                        return Result.Failure("Code:409 Message:Este email já está em uso.");
                    }
                }

                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError());
            }

            return Result.Failure(ErrorCatalog.InternalServerError.SetError());
        }
    }
}
