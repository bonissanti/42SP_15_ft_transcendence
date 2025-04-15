import {CreateUserCommand} from "../CommandObject/CreateUserCommand";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository";
import {EmailVO} from "../../../Domain/ValueObjects/EmailVO";
import {PasswordHashVO} from "../../../Domain/ValueObjects/PasswordHashVO";

export class CreateUserCommandValidator
{
    private UserRepository: UserRepository;

    constructor(userRepository: UserRepository)
    {
        this.UserRepository = userRepository;
    }

    public ValidUser(command: CreateUserCommand)
    {
        // const userExists: boolean = this.UserRepository.findByUserName(command.Username);
        const emailIsValid: boolean = EmailVO.ValidEmail(command.Email);
        const passwordIsValid: boolean = PasswordHashVO.ValidPassword(command.Password);
    }
}