import {GetUserViewModel} from "../../../Presentation/ViewModels/GetUserViewModel.js";

export class GetUserDTO
{
    public readonly uuid: string;
    public readonly email?: string | null;
    public readonly username?: string | null;

    constructor(uuid: string, email?: string | null, username?: string | null)
    {
        this.uuid = uuid;
        this.email = email;
        this.username = username;
    }
}