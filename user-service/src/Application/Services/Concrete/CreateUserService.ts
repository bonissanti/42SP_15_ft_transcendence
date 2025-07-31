import { CreateUserDTO } from "../../DTO/ToCommand/CreateUserDTO.js";
import { BaseService } from "../Interfaces/BaseService.js";
import {FastifyReply, FastifyRequest} from "fastify";
import { Result } from "../../../Shared/Utils/Result.js";
import { ErrorCatalog } from "../../../Shared/Errors/ErrorCatalog.js";
import { CreateUserCommand } from "../../../Domain/Command/CommandObject/CreateUserCommand.js";
import { UserRepository } from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import { CreateUserCommandHandler } from "../../../Domain/Command/Handlers/CreateUserCommandHandler.js";
import { CreateUserCommandValidator } from "../../../Domain/Command/Validators/CreateUserCommandValidator.js";
import { NotificationError } from "../../../Shared/Errors/NotificationError.js";
import { ValidationException } from "../../../Shared/Errors/ValidationException.js";
import { Prisma } from "@prisma/client";
import {ErrorTypeEnum} from "../../Enums/ErrorTypeEnum.js";
import {LoginUserViewModel} from "../../ViewModels/LoginUserViewModel.js";

export class CreateUserService implements BaseService<CreateUserDTO> {
    private readonly UserRepository: UserRepository;
    private CreateUserHandler: CreateUserCommandHandler;
    private CreateUserValidator: CreateUserCommandValidator;

    constructor(userRepository: UserRepository, notificationError: NotificationError) {
        this.UserRepository = userRepository;
        this.CreateUserValidator = new CreateUserCommandValidator(this.UserRepository, notificationError);
        this.CreateUserHandler = new CreateUserCommandHandler(this.UserRepository, notificationError);
    }

    public async Create(dto: CreateUserDTO, request: FastifyRequest <{ Body: CreateUserDTO }>, reply: FastifyReply): Promise<Result<LoginUserViewModel>>
    {
        try
        {
            const command: CreateUserCommand = CreateUserCommand.FromDTO(dto);
            await this.CreateUserValidator.Validator(command);
            await this.CreateUserHandler.Handle(command);
            const loginUserViewModel = this.GenerateToken(reply, request);

            return Result.SuccessWithData<LoginUserViewModel>("User created and logged successfully", loginUserViewModel);
        } catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message, ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                if (error.code === 'P2002') {
                    const target = error.meta?.target as string[];

                    if (target?.includes('username')) {
                        return Result.Failure(ErrorCatalog.UsernameAlreadyExists.SetError(), ErrorTypeEnum.VALIDATION);
                    }

                    if (target?.includes('email')) {
                        return Result.Failure("Code:409 Message:Este email já está em uso.");
                    }
                }

                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum.CONFLICT);
            }

            return Result.Failure(ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum.CONFLICT);
        }
    }

    private GenerateToken(reply: FastifyReply, request: FastifyRequest<{ Body: CreateUserDTO }>)
    {
        const body = request.body;

        const token = request.server.jwt.sign({
            username: body.username,
            isAuthenticated: true,
        }, { expiresIn: '1h' });

        reply.setCookie('token', token, {
            httpOnly: true,
            secure: false, // Deixei como false porque a aplicação ainda está em HTTP, mas deve ser true em HTTPS
            sameSite: 'lax',
            path: '/',
        });

        return new LoginUserViewModel(token, null, body.username, body.profilePic);
    }

    public async Execute(dto: CreateUserDTO, reply: FastifyReply): Promise<Result>
    {
        try
        {
            const command: CreateUserCommand = CreateUserCommand.FromDTO(dto);
            await this.CreateUserValidator.Validator(command);
            await this.CreateUserHandler.Handle(command);

            return Result.Success("User created successfully");
        } catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure(message, ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof Prisma.PrismaClientKnownRequestError)
            {
                if (error.code === 'P2002') {
                    const target = error.meta?.target as string[];

                    if (target?.includes('username')) {
                        return Result.Failure(ErrorCatalog.UsernameAlreadyExists.SetError(), ErrorTypeEnum.VALIDATION);
                    }

                    if (target?.includes('email')) {
                        return Result.Failure("Code:409 Message:Este email já está em uso.");
                    }
                }

                return Result.Failure(ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum.CONFLICT);
            }

            return Result.Failure(ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum.CONFLICT);
        }
    }
}
