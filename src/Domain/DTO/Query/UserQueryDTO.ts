import {UserViewModel} from "../../../Presentation/ViewModels/UserViewModel.js";

export class UserQueryDTO
{
    public readonly Uuid: string;
    public readonly Email: string;
    public readonly Username: string;
    public readonly ProfilePic: string | null;

    constructor(uuid: string, email: string, username: string, profilepic: string | null = null)
    {
        this.Uuid = uuid;
        this.Email = email;
        this.Username = username;
        this.ProfilePic = profilepic;
    }
}