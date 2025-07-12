import {FastifyReply} from "fastify";
import {Result} from "../../../Shared/Utils/Result.js";

export interface BaseService<TRequest, TResponse = void>
{
    Execute(dto: TRequest, reply: FastifyReply): Promise<Result<TResponse>>;
}