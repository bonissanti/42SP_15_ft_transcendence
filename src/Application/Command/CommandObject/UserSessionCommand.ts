import {UserSessionDTO} from "../../../Domain/DTO/Command/UserSessionDTO.js";

export class UserSessionCommand
{
    public readonly Uuid: string;
    public readonly Email: string;
    public readonly Password: string;
    public readonly LastLogin: Date;

    constructor(uuid: string, email: string, password: string, lastLogin: Date)
    {
        this.Uuid = uuid;
        this.Email = email;
        this.Password = password;
        this.LastLogin = lastLogin;
    }

    public static FromDTO(dto: UserSessionDTO): UserSessionCommand
    {
        return new UserSessionCommand(dto.uuid, dto.email, dto.password, dto.lastLogin);
    }
}