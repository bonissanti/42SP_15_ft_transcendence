import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {UserSessionCommand} from "../CommandObject/UserSessionCommand.js";
import {PasswordHashVO} from "../../ValueObjects/PasswordHashVO.js";

export class LoginSessionCommandHandler implements BaseHandlerCommand<UserSessionCommand>
{
   private UserRepository: UserRepository;

   constructor(userRepository: UserRepository, notification: NotificationError) {
       this.UserRepository = userRepository;
   }

   async Handle(command: UserSessionCommand) : Promise<void>
   {
      const user = await this.UserRepository.GetUserEntityByEmail(command.Email);

      user?.ChangeStatusOnline(command.isOnline);

      await this.UserRepository.Update(user!.Uuid, user);
   }
}