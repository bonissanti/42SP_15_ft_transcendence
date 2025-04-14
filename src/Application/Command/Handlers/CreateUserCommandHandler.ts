import {BaseHandler} from "./BaseHandler";
import {CreateUserCommand} from "../CommandObject/CreateUserCommand";
import {PasswordHashVO} from "../../../Domain/ValueObjects/PasswordHashVO";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository";
import {User} from "../../../Domain/Entities/Concrete/User";

export class CreateUserCommandHandler implements BaseHandler<CreateUserCommand>
{
    private UserRepository: UserRepository;

    constructor ()
    {
        this.UserRepository = new UserRepository();
    }

    async handle(command: CreateUserCommand) : Promise<void>
    {
        const passwordHashVO = await PasswordHashVO.create(command.Password);

        const userEntity: User = new User(command.Email, passwordHashVO, command.Username);
    }
}