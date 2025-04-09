import {UserDTO} from "../../../Domain/DTO/Command/UserDTO";

export class UserCommand
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

    public static FromDTO(dto: UserDTO): UserCommand
    {
        return new UserCommand(dto.Email, dto.Password, dto.Username);
    }
}