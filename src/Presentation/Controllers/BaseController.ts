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
        {
            const errors = notificationError.GetAllErrors();
            console.error("Errors found :(")
            console.error(errors);
        }
        const statusCode: number = result.Error?.Code!;
        const message: string = result.Error?.Message!;

        return reply.status(statusCode).send({
            code: statusCode,
            message: message,
        })
    }
}