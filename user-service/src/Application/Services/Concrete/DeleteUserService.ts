import { FastifyReply } from "fastify";
import { BaseService } from "../Interfaces/BaseService.js";
import { DeleteUserDTO } from "../../DTO/ToCommand/DeleteUserDTO.js";
import { NotificationError } from "../../../Shared/Errors/NotificationError.js";
import { UserRepository } from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import { DeleteUserCommandValidator } from "../../../Domain/Command/Validators/DeleteUserCommandValidator.js";
import { DeleteUserCommand } from "../../../Domain/Command/CommandObject/DeleteUserCommand.js";
import { DeleteUserCommandHandler } from "../../../Domain/Command/Handlers/DeleteUserCommandHandler.js";
import { Result } from "../../../Shared/Utils/Result.js";
import { ValidationException } from "../../../Shared/Errors/ValidationException.js";
import { ErrorCatalog } from "../../../Shared/Errors/ErrorCatalog.js";
import { Prisma } from "@prisma/client";
import {ErrorTypeEnum} from "../../Enums/ErrorTypeEnum.js";

export class DeleteUserService implements BaseService<DeleteUserDTO> {
    private UserRepository: UserRepository;
    private DeleteUserHandler: DeleteUserCommandHandler;
    private DeleteUserValidator: DeleteUserCommandValidator;

    constructor(userRepository: UserRepository, notificationError: NotificationError) {
        this.UserRepository = userRepository;
        this.DeleteUserValidator = new DeleteUserCommandValidator(this.UserRepository, notificationError);
        this.DeleteUserHandler = new DeleteUserCommandHandler(this.UserRepository, notificationError);
    }

    public async Execute(dto: DeleteUserDTO, reply: FastifyReply): Promise<Result> {
        try {
            const command: DeleteUserCommand = DeleteUserCommand.FromDTO(dto);
            await this.DeleteUserValidator.Validator(command);
            await this.DeleteUserHandler.Handle(command);

            return Result.Sucess("User deleted successfully");
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message, ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                if (error.code === 'P2025')
                    return Result.Failure("User to be deleted not found.", ErrorTypeEnum.VALIDATION);

                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum.CONFLICT);
            }

            return Result.Failure(ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum.INTERNAL);
        }
    }
}
