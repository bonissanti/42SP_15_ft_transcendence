import {UserSessionDTO} from "../../../Application/DTO/ToCommand/UserSessionDTO.js";

export class UserSessionCommand
{
    public readonly Email: string;
    public readonly Password: string;
    public readonly isOnline: boolean;

    constructor(email: string, password: string, isOnline: boolean)
    {
        this.Email = email;
        this.Password = password;
        this.isOnline = isOnline;
    }

    public static FromDTO(dto: UserSessionDTO): UserSessionCommand
    {
        return new UserSessionCommand(dto.email, dto.password, dto.isOnline);
    }
}