import {UserSessionDTO} from "../../../Domain/DTO/Command/UserSessionDTO.js";

export class UserSessionCommand
{
    public readonly Uuid: string;
    public readonly Email: string;
    public readonly Password: string;
    public readonly LastLogin: Date;
    public readonly isOnline: boolean;

    constructor(uuid: string, email: string, password: string, lastLogin: Date, isOnline: boolean)
    {
        this.Uuid = uuid;
        this.Email = email;
        this.Password = password;
        this.LastLogin = lastLogin;
        this.isOnline = isOnline;
    }

    public static FromDTO(dto: UserSessionDTO): UserSessionCommand
    {
        return new UserSessionCommand(dto.uuid, dto.email, dto.password, dto.lastLogin, dto.isOnline);
    }
}