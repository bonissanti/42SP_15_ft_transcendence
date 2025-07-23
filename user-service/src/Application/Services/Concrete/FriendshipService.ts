import {BaseService} from "../Interfaces/BaseService.js";
import {Result} from "../../../Shared/Utils/Result.js";
import {AddRequestFriendDTO} from "../../DTO/ToCommand/AddRequestFriendDTO.js";
import {AddRequestFriendCommand} from "../../../Domain/Command/CommandObject/AddRequestFriendCommand.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {ChangeRequestFriendStatusDTO} from "../../DTO/ToCommand/ChangeRequestFriendStatusDTO.js";
import {
    ChangeRequestFriendStatusCommand
} from "../../../Domain/Command/CommandObject/ChangeRequestFriendStatusCommand.js";

export class FriendshipService implements BaseService<any, boolean>
{
    private readonly AddRequestFriendHandler: AddRequestFriendCommandHandler;
    private readonly AddRequestFriendValidator: AddRequestFriendCommandValidator;

    constructor()

    Execute(dto: any, reply: FastifyReply): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }

    public async AddFriendService(dto: AddRequestFriendDTO, reply: FastifyReply): Promise<Result<void>>
    {
        try
        {
            const command: AddRequestFriendCommand = AddRequestFriendCommand.fromDTO(dto);
            await this.AddRequestFriendValidator.Validator(command);
            await this.AddRequestFriendHandler.Handler(command);

            return Result.Sucess("Request sent successfully to user");
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

    public async ChangeStatusService(dto: ChangeRequestFriendStatusDTO, reply: FastifyReply): Promise<Result<void>>
    {
        try
        {
            const command: ChangeRequestFriendStatusCommand = ChangeRequestFriendStatusCommand.fromDTO(dto);
            await this.ChangeRequestFriendStatusValidator.Validator(command);
            await this.ChangeRequestFriendStatusHandler.Handler(command);

            return Result.Sucess(`Request status changed to ${command.status}`);
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

    //TODO: adicionar service para listar amizades por status passado (pending/accept)
    // public async ListFriendService(dto: List)
}