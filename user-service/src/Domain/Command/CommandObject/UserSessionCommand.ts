import {UserSessionDTO} from "../../../Application/DTO/Command/UserSessionDTO.js";

export class UserSessionCommand
{
    public readonly Uuid: string;
    public readonly Email: string;
    public readonly Password: string;
    public readonly isOnline: boolean;

    constructor(uuid: string, email: string, password: string, isOnline: boolean)
    {
        this.Uuid = uuid;
        this.Email = email;
        this.Password = password;
        this.isOnline = isOnline;
    }

    public static FromDTO(dto: UserSessionDTO): UserSessionCommand
    {
        return new UserSessionCommand(dto.uuid, dto.email, dto.password, dto.isOnline);
    }
}