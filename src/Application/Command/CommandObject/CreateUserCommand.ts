import {CreateUserDTO} from "../../../Domain/DTO/Command/CreateUserDTO";

export class CreateUserCommand
{
    public readonly Email: string;
    public readonly Password: string;
    public readonly Username: string;

    private constructor(email:string, password:string, username:string)
    {
        this.Email = email;
        this.Password = password;
        this.Username = username;
    }

    public static FromDTO(dto: CreateUserDTO): CreateUserCommand
    {
        return new CreateUserCommand(dto.Email, dto.Password, dto.Username);
    }
}