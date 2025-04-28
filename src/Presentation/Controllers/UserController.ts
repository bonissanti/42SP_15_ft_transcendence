import { CreateUserDTO } from "../../Domain/DTO/Command/CreateUserDTO.js";
import { Result } from "../../Shared/Utils/Result.js";
import { FastifyReply, FastifyRequest } from "fastify";
import {BaseController} from "./BaseController.js";
import {CreateUserService} from "../../Application/Services/Concrete/CreateUserService.js";
import {NotificationError} from "../../Shared/Errors/NotificationError.js";
import {EditUserDTO} from "../../Domain/DTO/Command/EditUserDTO.js";
import {EditUserService} from "../../Application/Services/Concrete/EditUserService.js";
import {DeleteUserDTO} from "../../Domain/DTO/Command/DeleteUserDTO.js";

export class UserController extends BaseController
{
    private readonly NotificationError: NotificationError;
    private readonly CreateUserService: CreateUserService;
    private readonly EditUserService: EditUserService;

    constructor()
    {
        super();
        this.NotificationError = new NotificationError();
        this.CreateUserService = new CreateUserService(this.NotificationError);
        this.EditUserService = new EditUserService(this.NotificationError);
    }

    public async CreateUser(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply) : Promise<FastifyReply>
    {
        const body = request.body;
        const userDTO: CreateUserDTO = new CreateUserDTO(body.email, body.password, body.username, body.profilePic);
        const result: Result = await this.CreateUserService.Execute(userDTO, reply);

        return(this.handleResult(result, reply, this.NotificationError));
    }

    public async EditUser(request: FastifyRequest<{ Body: EditUserDTO }>, reply: FastifyReply) : Promise<FastifyReply>
    {
        const body = request.body;
        const userDTO: EditUserDTO = new EditUserDTO(body.uuid, body.email, body.password, body.username, body.profilePic);
        const result: Result = await this.EditUserService.Execute(userDTO, reply);

        return(this.handleResult(result, reply, this.NotificationError));
    }

    public async DeleteUser(request: FastifyRequest<{ Body: { uuid: string } }>, reply: FastifyReply) : Promise<FastifyReply>
    {
        const body: { uuid: string } = request.body;
        const usetDTO: DeleteUserDTO = new DeleteUserDTO(body.uuid);
        const result: Result = await this.DeleteUserService.Execute(usetDTO, reply);
    }
}
