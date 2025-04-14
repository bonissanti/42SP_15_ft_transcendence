import {CreateUserDTO} from "../../../Domain/DTO/Command/CreateUserDTO";
import {BaseService} from "../Interfaces/BaseService";
import {FastifyReply} from "fastify";
import {Result} from "../../../Shared/Utils/Result";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog";
import {CreateUserCommand} from "../../Command/CommandObject/CreateUserCommand";

export class CreateUserService implements BaseService<CreateUserDTO>
{
    public async execute(dto: CreateUserDTO, reply: FastifyReply) : Promise<Result>
    {
        try
        {
            const command: CreateUserCommand = CreateUserCommand.FromDTO(dto);


            return Result.Sucess();
        }
        catch (error){
            return Result.Failure(ErrorCatalog.InternalServerError);
        }
    }
}
