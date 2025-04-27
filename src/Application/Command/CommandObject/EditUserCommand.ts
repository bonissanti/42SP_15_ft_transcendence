import {EditUserDTO} from "../../../Domain/DTO/Command/EditUserDTO.js";

export class EditUserCommand
{
    public readonly Email: string;
    public readonly Password: string;
    public readonly Username: string;
    public readonly ProfilePic: string | null;

    private constructor(email: string, password: string, username: string, profilepic: string | null = null)
    {
        this.Email = email;
        this.Password = password;
        this.Username = username;
        this.ProfilePic = profilepic;
    }

    public static FromDTO(dto: EditUserDTO): EditUserCommand
    {
        return new EditUserCommand(dto.email, dto.password, dto.username, dto.profilePic);
    }
}