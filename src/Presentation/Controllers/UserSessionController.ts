import {BaseController} from "./BaseController.js";
import {NotificationError} from "../../Shared/Errors/NotificationError.js";
import {LoginUserService} from "../../Application/Services/Concrete/LoginUserService.js";
import {FastifyReply, FastifyRequest} from "fastify";
import {UserSessionDTO} from "../../Domain/DTO/Command/UserSessionDTO.js";
import {Result} from "../../Shared/Utils/Result.js";
import {LogoutUserService} from "../../Application/Services/Concrete/LogoutUserService.js";

export class UserSessionController extends BaseController
{
    private readonly NotificationError: NotificationError;
    private readonly LoginUserService: LoginUserService;
    private readonly LogoutUserService: LogoutUserService;

    constructor()
    {
        super();
        this.NotificationError = new NotificationError();
        this.LoginUserService = new LoginUserService(this.NotificationError);
        this.LogoutUserService = new LogoutUserService(this.NotificationError);
    }

    public async LoginUser(request: FastifyRequest<{ Body: UserSessionDTO }>, reply: FastifyReply) : Promise<FastifyReply>
    {
        const body = request.body;
        const result: Result = await this.LoginUserService.Execute(body);

        return(this.handleResult(result, reply, this.NotificationError));
    }

    public async LogoutUser(request: FastifyRequest<{ Body: UserSessionDTO }>, reply: FastifyReply) : Promise<FastifyReply>
    {
        const body = request.body;
        const result: Result = await this.LogoutUserService.Execute(body);

        return(this.handleResult(result, reply, this.NotificationError));
    }
}