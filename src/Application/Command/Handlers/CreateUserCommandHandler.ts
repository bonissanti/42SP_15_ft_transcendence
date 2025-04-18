import {BaseHandler} from "./BaseHandler";
import {CreateUserCommand} from "../CommandObject/CreateUserCommand";
import {PasswordHashVO} from "../../../Domain/ValueObjects/PasswordHashVO";
import {EmailVO} from "../../../Domain/ValueObjects/EmailVO";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository";
import {User} from "../../../Domain/Entities/Concrete/User";
import {NotificationError} from "../../../Shared/Errors/NotificationError";

export class CreateUserCommandHandler implements BaseHandler<CreateUserCommand>
{
    private UserRepository: UserRepository;

    constructor(userRepository: UserRepository, notification: NotificationError) {
        this.UserRepository = userRepository;
    }

    async Handle(command: CreateUserCommand) : Promise<void>
    {
        const passwordHashVO = await PasswordHashVO.create(command.Password);
        const emailVO = EmailVO.AddEmail(command.Email);

        const userEntity: User = new User(emailVO, passwordHashVO, command.Username);

        await this.UserRepository.Create(userEntity);
    }
}