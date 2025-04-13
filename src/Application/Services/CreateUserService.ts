import {CreateUserDTO} from "../../Domain/DTO/Command/CreateUserDTO";
import {FastifyReply} from "fastify";
import {Result} from "../../Shared/Utils/Result";
import {ErrorCatalog} from "../../Shared/Errors/ErrorCatalog";

export class CreateUserService
{
    constructor (UserDto: CreateUserDTO, reply: FastifyReply)
    {
    }

    public async execute(dto: CreateUserDTO, reply: FastifyReply) : Promise<Result>
    {
        try
        {

        }
        catch (error){
            return Result.Failure(ErrorCatalog.InternalServerError);
        }
    }
}
