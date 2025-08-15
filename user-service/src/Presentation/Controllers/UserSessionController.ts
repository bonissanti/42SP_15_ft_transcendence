import {BaseController} from "./BaseController.js";
import {NotificationError} from "../../Shared/Errors/NotificationError.js";
import {FastifyReply, FastifyRequest} from "fastify";
import {UserSessionDTO} from "../../Application/DTO/ToCommand/UserSessionDTO.js";
import {Result} from "../../Shared/Utils/Result.js";
import {LoginUserService} from "../../Application/Services/Concrete/LoginUserService.js";
import {LogoutUserService} from "../../Application/Services/Concrete/LogoutUserService.js";
import {LoginUserViewModel} from "../../Application/ViewModels/LoginUserViewModel.js";

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

    public async LoginUser(request: FastifyRequest<{ Body: UserSessionDTO }>, reply: FastifyReply)
    {
        const body = request.body;
        const result: Result<LoginUserViewModel> = await this.loginUserService.Login(body, request, reply);

        return(this.handleResult(result, reply, this.notificationError));
    }

    public async LogoutUser(request: FastifyRequest<{ Body: UserSessionDTO }>, reply: FastifyReply) : Promise<Result>
    {
        const body = request.body;
        const result: Result = await this.logoutUserService.Logout(body, request);

        return(this.handleResult(result, reply, this.notificationError));
    }
}