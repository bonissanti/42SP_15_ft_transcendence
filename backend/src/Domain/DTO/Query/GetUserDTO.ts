import {GetUserViewModel} from "../../../Presentation/ViewModels/GetUserViewModel.js";

export class GetUserDTO
{
    public readonly uuid: string;
    public readonly email?: string | null; // TODO: checar se é possivel buscar usuario usando email
    public readonly username?: string | null;

    constructor(uuid: string, email?: string | null, username?: string | null)
    {
        this.uuid = uuid;
        this.email = email; // TODO: no validator do create/edit, verificar se o email ja existe, manter um só
        this.username = username;
    }
}