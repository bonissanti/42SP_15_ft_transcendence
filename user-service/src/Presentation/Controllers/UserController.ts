import { CreateUserDTO } from "../../Application/DTO/ToCommand/CreateUserDTO.js";
import { Result } from "../../Shared/Utils/Result.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { BaseController } from "./BaseController.js";
import { CreateUserService } from "../../Application/Services/Concrete/CreateUserService.js";
import { NotificationError } from "../../Shared/Errors/NotificationError.js";
import { EditUserDTO } from "../../Application/DTO/ToCommand/EditUserDTO.js";
import { EditUserService } from "../../Application/Services/Concrete/EditUserService.js";
import { DeleteUserDTO } from "../../Application/DTO/ToCommand/DeleteUserDTO.js";
import { DeleteUserService } from "../../Application/Services/Concrete/DeleteUserService.js";
import { GetUserDTO } from "../../Application/DTO/ToQuery/GetUserDTO.js";
import { GetUserService } from "../../Application/Services/Concrete/GetUserService.js";
import { GetUserViewModel } from "../../Application/ViewModels/GetUserViewModel.js";
import {VerifyIfUsersExistsByUuidsDTO} from "../../Application/DTO/ToQuery/VerifyIfUsersExistsByUuidsDTO.js";
import {UserService} from "../../Application/Services/Concrete/UserService.js";
import {UpdateStatsDTO} from "../../Application/DTO/ToCommand/UpdateStatsDTO.js";
import * as repl from "node:repl";

export class UserController extends BaseController {
    private readonly notificationError: NotificationError;
    private readonly createUserService: CreateUserService;
    private readonly editUserService: EditUserService;
    private readonly deleteUserService: DeleteUserService;
    private readonly getUserService: GetUserService;
    private readonly userService: UserService;

    constructor(
        createUserService: CreateUserService,
        editUserService: EditUserService,
        deleteUserService: DeleteUserService,
        getUserService: GetUserService,
        verificationService: UserService
    ) {
        super();
        this.notificationError = new NotificationError();
        this.createUserService = createUserService;
        this.editUserService = editUserService;
        this.deleteUserService = deleteUserService;
        this.getUserService = getUserService;
        this.userService = verificationService;
    }

    public async CreateUser(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply): Promise<Result> {
        const body = request.body;
        const userDTO: CreateUserDTO = new CreateUserDTO(body.email, body.password, body.username, body.profilePic, body.lastLogin);
        const result: Result = await this.createUserService.Execute(userDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }

    public async EditUser(request: FastifyRequest<{ Body: EditUserDTO }>, reply: FastifyReply): Promise<Result> {
        const body = request.body;
        const userDTO: EditUserDTO = new EditUserDTO(body.uuid, body.email, body.password, body.username, body.profilePic);
        const result: Result = await this.editUserService.Execute(userDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }

    public async DeleteUser(request: FastifyRequest<{ Body: DeleteUserDTO }>, reply: FastifyReply): Promise<Result> {
        const body = request.body;
        const userDTO: DeleteUserDTO = new DeleteUserDTO(body.Uuid);
        const result: Result = await this.deleteUserService.Execute(userDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }

    public async GetUser(request: FastifyRequest<{ Querystring: GetUserDTO }>, reply: FastifyReply): Promise<Result> {
        const query = request.query;
        const userDTO: GetUserDTO = new GetUserDTO(query.uuid, query.email, query.username);
        const result: Result<GetUserViewModel> = await this.getUserService.Execute(userDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }

    public async VerifyIfUsersExists(request: FastifyRequest<{ Querystring: { uuids: string[] } }>, reply: FastifyReply): Promise<Result> {
        const query = request.query;
        const usersDTO: VerifyIfUsersExistsByUuidsDTO = new VerifyIfUsersExistsByUuidsDTO(query.uuids);
        const result: Result<boolean> = await this.userService.VerifyIfUserExistsByUuidsService(usersDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }

    public async findOne(request: FastifyRequest<{ Params: { uuid: string } }>, reply: FastifyReply)
    {
        try
        {
            const { uuid } = request.params;
            const dto = new GetUserDTO(uuid);
            const result: Result<GetUserViewModel> = await this.getUserService.Execute(dto, reply);
            return this.handleResult(result, reply, this.notificationError);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async UpdateStats(request: FastifyRequest<{ Body: UpdateStatsDTO }>, reply: FastifyReply): Promise<Result>
    {
        const query = request.body;
        const statsDTO: UpdateStatsDTO = new UpdateStatsDTO(query.player1Username, query.player1Points, query.player2Username, query.player2Points);
        const result: Result<void> = await this.userService.UpdateStatsService(statsDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
}
