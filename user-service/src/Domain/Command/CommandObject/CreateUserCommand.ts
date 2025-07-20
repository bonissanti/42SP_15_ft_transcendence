import {CreateUserDTO} from "../../../Application/DTO/Command/CreateUserDTO.js";

export class CreateUserCommand
{
    public readonly Email: string;
    public readonly Password: string;
    public readonly Username: string;
    public readonly ProfilePic: string | null;
    public readonly LastLogin: Date | null;

    private constructor(email:string, password:string, username:string, profilepic: string | null = null, lastLogin: Date | null)
    {
        this.Email = email;
        this.Password = password;
        this.Username = username;
        this.ProfilePic = profilepic;
        this.LastLogin = lastLogin;
    }

    public static FromDTO(dto: CreateUserDTO): CreateUserCommand
    {
        const email: string = dto.email;
        const password: string = dto.password;
        const username: string = dto.username;
        const profilepic: string | null = dto.profilePic;
        const lastLogin: Date | null = dto.lastLogin ? new Date(dto.lastLogin) : null;

        return new CreateUserCommand(email, password, username, profilepic, lastLogin);
    }
}