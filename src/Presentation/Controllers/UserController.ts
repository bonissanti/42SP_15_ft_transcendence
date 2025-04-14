import { CreateUserDTO } from "../../Domain/DTO/Command/CreateUserDTO";
import { Result } from "../../Shared/Utils/Result";
import { FastifyReply, FastifyRequest } from "fastify";
import {BaseController} from "./BaseController";

export class UserController extends BaseController
{
    constructor()
    {
        super();
    }

    protected async CreateUser(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply) : Promise<void>
    {
        const userDTO: CreateUserDTO = request.body;
        const result: Result = Result.Sucess();

        this.handleResult(result, reply);
    }
}
