import {CreateUserDTO} from "../../../Domain/DTO/Command/CreateUserDTO";

export class CreateUserCommand
{
    public readonly Email: string;
    public readonly Password: string;
    public readonly Username: string;
    public readonly ProfilePic: string | null;

    private constructor(email:string, password:string, username:string, profilepic: string | null = null)
    {
        this.Email = email;
        this.Password = password;
        this.Username = username;
        this.ProfilePic = profilepic;

    }

    public static FromDTO(dto: CreateUserDTO): CreateUserCommand
    {
        return new CreateUserCommand(dto.Email, dto.Password, dto.Username, dto.ProfilePic);
    }
}