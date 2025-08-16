import {CreateUserDTO} from "../../../Application/DTO/ToCommand/CreateUserDTO.js";

export class CreateUserCommand
{
    public readonly Email: string;
    public readonly Password: string;
    public readonly Username: string;
    public readonly Annonymous: boolean = false;
    public readonly ProfilePic: string | null;
    public readonly LastLogin: Date | null;
    public readonly Uuid?: string;

    private constructor(email:string, password:string, username:string, annonymous: boolean, profilepic: string | null = null, lastLogin: Date | null, uuid?: string)
    {
        this.Email = email;
        this.Password = password;
        this.Username = username;
        this.Annonymous = annonymous;
        this.ProfilePic = profilepic;
        this.LastLogin = lastLogin;
        this.Uuid = uuid;
    }

    public static FromDTO(dto: CreateUserDTO): CreateUserCommand
    {
        const lastLogin: Date | null = dto.lastLogin ? new Date(dto.lastLogin) : null;

        return new CreateUserCommand(dto.email, dto.password, dto.username, dto.anonymous, dto.profilePic, lastLogin, dto.uuid);
    }
}