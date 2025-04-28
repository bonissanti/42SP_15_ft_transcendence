import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {CreateUserCommand} from "../CommandObject/CreateUserCommand.js";
import {PasswordHashVO} from "../../../Domain/ValueObjects/PasswordHashVO.js";
import {EmailVO} from "../../../Domain/ValueObjects/EmailVO.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {User} from "../../../Domain/Entities/Concrete/User.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";

export class CreateUserCommandHandler implements BaseHandlerCommand<CreateUserCommand>
{
    private UserRepository: UserRepository;

    constructor(userRepository: UserRepository, notification: NotificationError) {
        this.UserRepository = userRepository;
    }

    async Handle(command: CreateUserCommand) : Promise<void>
    {
        const passwordHashVO = await PasswordHashVO.create(command.Password);
        const emailVO = EmailVO.AddEmail(command.Email);

        const userEntity: User = new User(emailVO, passwordHashVO, command.Username, command.ProfilePic);

        await this.UserRepository.Create(userEntity);
    }
}