import {Result} from "../../Shared/Utils/Result";
import {FastifyReply} from "fastify";
import {NotificationError} from "../../Shared/Errors/NotificationError";

export abstract class BaseController
{
    protected handleResult<T>(result: Result, reply: FastifyReply, notificationError: NotificationError)
    {
        if (result.isSucess)
            return reply.status(200).send("User created sucessfully");

        if (notificationError.NumberOfErrors() > 0 && !result.isSucess)
            return reply.status(400).send(result.getMessage())
        else
            return reply.status(500).send(result.getMessage())
    }
}