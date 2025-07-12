import {BaseController} from "./BaseController.js";
import {NotificationError} from "../../Shared/Errors/NotificationError.js";
import {FastifyReply, FastifyRequest} from "fastify";
import {UserSessionDTO} from "../../Domain/DTO/Command/UserSessionDTO.js";
import {Result} from "../../Shared/Utils/Result.js";
import {LoginUserService} from "../../Application/Services/Concrete/LoginUserService";
import {LogoutUserService} from "../../Application/Services/Concrete/LogoutUserService";

export class UserSessionController extends BaseController
{
    private readonly notificationError: NotificationError;
    private readonly loginUserService: LoginUserService;
    private readonly logoutUserService: LogoutUserService;

    constructor(loginUserService: LoginUserService, logoutUserService: LogoutUserService)
    {
        super();
        this.notificationError = new NotificationError();
        this.loginUserService = loginUserService;
        this.logoutUserService = logoutUserService;
    }

    public async LoginUser(request: FastifyRequest<{ Body: UserSessionDTO }>, reply: FastifyReply) : Promise<Result>
    {
        const body = request.body;
        const result: Result = await this.loginUserService.Execute(body);

        return(this.handleResult(result, reply, this.notificationError));
    }

    public async LogoutUser(request: FastifyRequest<{ Body: UserSessionDTO }>, reply: FastifyReply) : Promise<Result>
    {
        const body = request.body;
        const result: Result = await this.logoutUserService.Execute(body);

        return(this.handleResult(result, reply, this.notificationError));
    }
}