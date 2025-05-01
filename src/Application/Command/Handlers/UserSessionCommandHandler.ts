import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {UserSessionCommand} from "../CommandObject/UserSessionCommand.js";
import {PasswordHashVO} from "../../../Domain/ValueObjects/PasswordHashVO.js";

export class UserSessionCommandHandler implements BaseHandlerCommand<UserSessionCommand>
{
   private UserRepository: UserRepository;

   constructor(userRepository: UserRepository, notification: NotificationError) {
       this.UserRepository = userRepository;
   }

   async Handle(command: UserSessionCommand) : Promise<void>
   {
       
   }

}