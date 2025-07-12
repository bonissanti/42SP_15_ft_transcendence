import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {UserSessionCommand} from "../CommandObject/UserSessionCommand.js";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";

export class LogoutSessionCommandHandler implements BaseHandlerCommand<UserSessionCommand>
{
    constructor(private UserRepository: TournamentRepository)
    {
    }

    async Handle(command: UserSessionCommand): Promise<void>
    {
        const user = await this.UserRepository.GetUserEntityByUuid(command.Uuid);

        user?.ChangeStatusOnline(command.isOnline);

        await this.UserRepository.Update(command.Uuid, user);
    }
}