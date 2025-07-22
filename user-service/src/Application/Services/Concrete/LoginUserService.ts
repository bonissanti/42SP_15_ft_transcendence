import {BaseService} from "../Interfaces/BaseService.js";
import {UserSessionDTO} from "../../DTO/Command/UserSessionDTO.js";
import {LoginSessionCommandHandler} from "../../../Domain/Command/Handlers/LoginSessionCommandHandler.js";
import {LoginSessionCommandValidator} from "../../../Domain/Command/Validators/LoginSessionCommandValidator.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {UserSessionCommand} from "../../../Domain/Command/CommandObject/UserSessionCommand.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import { Result } from "../../../Shared/Utils/Result.js";
import {FastifyReply, FastifyRequest} from "fastify";
import {User} from "../../../Domain/Entities/Concrete/User.js";
import {LoginUserViewModel} from "../../ViewModels/LoginUserViewModel.js";
import * as process from "node:process";

export class LoginUserService  implements BaseService<UserSessionDTO, LoginUserViewModel>
{
    private readonly UserRepository: UserRepository;
    private readonly LoginUserHandler: LoginSessionCommandHandler;
    private readonly LoginUserValidator: LoginSessionCommandValidator;

    constructor(userRepository: UserRepository, notification: NotificationError)
    {
        this.UserRepository = userRepository;
        this.LoginUserValidator = new LoginSessionCommandValidator(this.UserRepository, notification);
        this.LoginUserHandler = new LoginSessionCommandHandler(this.UserRepository, notification);
    }

    public Execute(): Promise<Result<LoginUserViewModel>>
    {
        throw new Error("Method not implemented.");
    }

    public async Login(dto: UserSessionDTO, request: FastifyRequest <{ Body: UserSessionDTO}>, reply: FastifyReply) : Promise<Result<LoginUserViewModel>>
    {
        try
        {
            const command: UserSessionCommand = UserSessionCommand.FromDTO(dto);
            await this.LoginUserValidator.Validator(command);
            await this.LoginUserHandler.Handle(command);
            const loginUserViewModel = this.GenerateToken(reply, request);

            return Result.SucessWithData<LoginUserViewModel>("User logged in successfully", loginUserViewModel);
        }
        catch (error)
        {
            if (error instanceof ValidationException)
            {
                const message: string = error.SetErrors();
                return Result.Failure<LoginUserViewModel>(message);
            }
            else if (error instanceof  PrismaClientKnownRequestError)
            {
                if (error.code === 'P2002')
                    return Result.Failure<LoginUserViewModel>(ErrorCatalog.UsernameAlreadyExists.SetError());

                return Result.Failure<LoginUserViewModel>(ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result.Failure<LoginUserViewModel>(ErrorCatalog.InternalServerError.SetError());
        }
    }

    private GenerateToken(reply: FastifyReply, request: FastifyRequest<{ Body: UserSessionDTO }>)
    {
        const body = request.body;

        const token = request.server.jwt.sign({
            uuid: body.uuid,
            isAuthenticated: true,
        }, { expiresIn: '1h' });

        reply.setCookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });

        return new LoginUserViewModel(token);
    }
}