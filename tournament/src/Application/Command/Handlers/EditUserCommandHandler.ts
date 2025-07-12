import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {EditUserCommand} from "../CommandObject/EditUserCommand.js";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {PasswordHashVO} from "../../../Domain/ValueObjects/PasswordHashVO.js";
import {EmailVO} from "../../../Domain/ValueObjects/EmailVO.js";
import {User} from "../../../Domain/Entities/Concrete/User.js";

export class EditUserCommandHandler implements BaseHandlerCommand<EditUserCommand>
{
    constructor(private UserRepository: TournamentRepository, Notifcation: NotificationError)
    {
    }

    async Handle(command: EditUserCommand): Promise<void>
    {
        const user: User | null = await this.UserRepository.GetUserEntityByUuid(command.Uuid);

        await this.ChangeFields(user, command);

        await this.UserRepository.Update(command.Uuid, user);
    }

    private async ChangeFields(user: User | null, command: EditUserCommand): Promise<void>
    {
        const emailVO = EmailVO.AddEmail(command.Email);
        const passwordHashVO = await PasswordHashVO.Create(command.Password);

       user?.ChangeEmail(emailVO);
       user?.ChangePassword(passwordHashVO);
       user?.ChangeUsername(command.Username);
       user?.ChangePhoto(command.ProfilePic);
    }
}