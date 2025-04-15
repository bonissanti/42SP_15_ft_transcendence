import {FastifyReply} from "fastify";
import {Result} from "../../../Shared/Utils/Result";

export interface BaseService<T>
{
    Execute(dto: T, reply: FastifyReply): Promise<Result>;
}