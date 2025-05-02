import { CreateUserDTO } from "../../Domain/DTO/Command/CreateUserDTO.js";
import { Result } from "../../Shared/Utils/Result.js";
import { FastifyReply, FastifyRequest } from "fastify";
import {BaseController} from "./BaseController.js";
import {CreateUserService} from "../../Application/Services/Concrete/CreateUserService.js";
import {NotificationError} from "../../Shared/Errors/NotificationError.js";
import {EditUserDTO} from "../../Domain/DTO/Command/EditUserDTO.js";
import {EditUserService} from "../../Application/Services/Concrete/EditUserService.js";
import {DeleteUserDTO} from "../../Domain/DTO/Command/DeleteUserDTO.js";
import {DeleteUserService} from "../../Application/Services/Concrete/DeleteUserService.js";
import {GetUserDTO} from "../../Domain/DTO/Query/GetUserDTO.js";
import {GetUserService} from "../../Application/Services/Concrete/GetUserService.js";
import {GetUserViewModel} from "../ViewModels/GetUserViewModel.js";
import {UserSessionDTO} from "../../Domain/DTO/Command/UserSessionDTO.js";

export class UserController extends BaseController
{
    private readonly NotificationError: NotificationError;
    private readonly CreateUserService: CreateUserService;
    private readonly EditUserService: EditUserService;
    private readonly DeleteUserService: DeleteUserService;
    private readonly GetUserService: GetUserService;

    constructor()
    {
        super();
        this.NotificationError = new NotificationError();
        this.CreateUserService = new CreateUserService(this.NotificationError);
        this.EditUserService = new EditUserService(this.NotificationError);
        this.DeleteUserService = new DeleteUserService(this.NotificationError);
        this.GetUserService = new GetUserService(this.NotificationError);
    }

    public async CreateUser(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply) : Promise<Result>
    {
        const body = request.body;
        const userDTO: CreateUserDTO = new CreateUserDTO(body.email, body.password, body.username, body.profilePic, body.lastLogin);
        const result: Result = await this.CreateUserService.Execute(userDTO, reply);

        return(this.handleResult(result, reply, this.NotificationError));
    }

    public async EditUser(request: FastifyRequest<{ Body: EditUserDTO }>, reply: FastifyReply) : Promise<Result>
    {
        const body = request.body;
        const userDTO: EditUserDTO = new EditUserDTO(body.uuid, body.email, body.password, body.username, body.profilePic);
        const result: Result = await this.EditUserService.Execute(userDTO, reply);

        return(this.handleResult(result, reply, this.NotificationError));
    }

    public async DeleteUser(request: FastifyRequest<{ Body: DeleteUserDTO }>, reply: FastifyReply) : Promise<Result>
    {
        const body = request.body;
        const userDTO: DeleteUserDTO = new DeleteUserDTO(body.Uuid);
        const result: Result = await this.DeleteUserService.Execute(userDTO, reply);

        return(this.handleResult(result, reply, this.NotificationError));
    }

    public async GetUser(request: FastifyRequest<{ Querystring: GetUserDTO }>, reply: FastifyReply) : Promise<Result>
    {
        const query = request.query;
        const userDTO: GetUserDTO = new GetUserDTO(query.uuid, query.email, query.username, query.profilePic)
        const result: Result<GetUserViewModel> = await this.GetUserService.Execute(userDTO, reply);

        return(this.handleResult(result, reply, this.NotificationError));
    }


}
