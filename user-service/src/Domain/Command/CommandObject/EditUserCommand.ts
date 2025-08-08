import {EditUserDTO} from "../../../Application/DTO/ToCommand/EditUserDTO.js";

export class EditUserCommand
{
    public readonly Uuid: string;
    public readonly Email: string;
    public readonly Password?: string | null;
    public readonly Username?: string | null;
    public readonly Anonymous: boolean = false;
    public readonly ProfilePic: string | null;

    private constructor(uuid: string, email: string, password: string | null | undefined, username: string | null | undefined, anonymous: boolean, profilepic: string | null = null)
    {
        this.Uuid = uuid;
        this.Email = email;
        this.Password = password;
        this.Username = username;
        this.Anonymous = anonymous;
        this.ProfilePic = profilepic;
    }

    public static FromDTO(dto: EditUserDTO): EditUserCommand
    {
        return new EditUserCommand(dto.uuid, dto.email, dto.password, dto.username, dto.anonymous, dto.profilePic);
    }
}