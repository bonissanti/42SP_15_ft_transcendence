import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {VerifyTwoFaCommand} from "../CommandObject/VerifyTwoFaCommand.js";
import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {LoginUserViewModel} from "../../../Application/ViewModels/LoginUserViewModel.js";
import {FastifyReply, FastifyRequest} from "fastify";
import {VerifyTwoFaDTO} from "../../../Application/DTO/ToCommand/VerifyTwoFaDTO.js";

export class VerifyTwoFaCommandHandler implements BaseHandlerCommand<VerifyTwoFaCommand, LoginUserViewModel>
{
    constructor(private UserRepository: UserRepository, notificationError: NotificationError)
    {
    }

    async Handle(command: VerifyTwoFaCommand, request: FastifyRequest<{ Querystring: VerifyTwoFaDTO }>, reply: FastifyReply): Promise<LoginUserViewModel>
    {
        const user = await this.UserRepository.GetUserEntityByUuid(command.uuid);

        if (!user) {
            throw new Error("User not found");
        }

        // Atualiza o status online do usuário
        user.ChangeStatusOnline(true);
        await this.UserRepository.Update(user.Uuid, user);

        const token = reply.server.jwt.sign({
            uuid: user.Uuid,
            username: user.Username,
            isAuthenticated: true,
        }, { expiresIn: '1d' });

        reply.setCookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
        });

        return new LoginUserViewModel(token, user.Uuid, user.Username, user.ProfilePic);
    }
}
