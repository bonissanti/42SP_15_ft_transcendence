import {FastifyReply} from "fastify";
import {Result} from "../../../Shared/Utils/Result.js";

export interface BaseService<T>
{
    Execute(dto: T, reply: FastifyReply): Promise<Result>;
}