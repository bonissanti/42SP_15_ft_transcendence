import {Result} from "../../Shared/Utils/Result.js";
import {FastifyReply} from "fastify";
import {NotificationError} from "../../Shared/Errors/NotificationError.js";

export abstract class BaseController
{
    protected handleResult<T>(result: Result<T>, reply: FastifyReply, notificationError: NotificationError)
    {
        var totalErrors = notificationError.NumberOfErrors();
        notificationError.CleanErrors();

        if (result.isSucess)
        {
            const responseData = result.getData();
            if (responseData)
            {
                console.log("Response Data:", responseData);
                return reply.status(200).send(responseData);
            }
            return reply.status(200).send(result.getMessage());
        }
        if (totalErrors > 0 && !result.isSucess)
            return reply.status(400).send(result.getMessage())
        else
            return reply.status(500).send(result.getMessage())
    }
}