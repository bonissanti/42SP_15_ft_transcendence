import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {UserSessionCommand} from "../CommandObject/UserSessionCommand.js";
import {PasswordHashVO} from "../../../Domain/ValueObjects/PasswordHashVO.js";

export class LoginSessionCommandHandler implements BaseHandlerCommand<UserSessionCommand>
{
   private UserRepository: TournamentRepository;

   constructor(userRepository: TournamentRepository, notification: NotificationError) {
       this.UserRepository = userRepository;
   }

   async Handle(command: UserSessionCommand) : Promise<void>
   {
      const user = await this.UserRepository.GetUserEntityByUuid(command.Uuid);

      user?.ChangeStatusOnline(command.isOnline);

      await this.UserRepository.Update(command.Uuid, user);
   }
}