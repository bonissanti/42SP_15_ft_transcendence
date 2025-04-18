import { CreateUserDTO } from "../../Domain/DTO/Command/CreateUserDTO";
import { Result } from "../../Shared/Utils/Result";
import { FastifyReply, FastifyRequest } from "fastify";
import {BaseController} from "./BaseController";
import {CreateUserService} from "../../Application/Services/Concrete/CreateUserService";
import {NotificationError} from "../../Shared/Errors/NotificationError";

export class UserController extends BaseController
{
    private readonly NotificationError: NotificationError;
    private readonly CreateUserService: CreateUserService;

    constructor()
    {
        super();
        this.NotificationError = new NotificationError();
        this.CreateUserService = new CreateUserService(this.NotificationError);
    }

    public async CreateUser(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply) : Promise<FastifyReply>
    {
        const userDTO: CreateUserDTO = request.body;
        const result: Result = await this.CreateUserService.Execute(userDTO, reply);

        return(this.handleResult(result, reply, this.NotificationError));
    }
}
