import { CreateUserDTO } from "../../Domain/DTO/Command/CreateUserDTO";
import { Result } from "../../Shared/Utils/Result";
import { FastifyReply, FastifyRequest } from "fastify";

export const createUser = async (request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply) => {
    const userDTO: CreateUserDTO = request.body;

    console.log("Received data: ", userDTO);

    const result: Result = Result.Sucess();

    if (result.isSucess)
        return reply.status(200).send("User created sucessfully");
    else
    {
        const statusCode: number = result.Error?.Code!;
        const message: string = result.Error?.Message!;
        return reply.status(statusCode).send({
            code: statusCode,
            message: message,
        })
    }
}

