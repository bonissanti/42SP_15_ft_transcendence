import {Result} from "../../Shared/Utils/Result";
import {FastifyReply} from "fastify";

export abstract class BaseController
{
    protected handleResult<T>(result: Result, reply: FastifyReply)
    {
        if (result.isSucess)
            return reply.status(200).send("User created sucessfully");

        const statusCode: number = result.Error?.Code!;
        const message: string = result.Error?.Message!;

        return reply.status(statusCode).send({
            code: statusCode,
            message: message,
        })
    }
}