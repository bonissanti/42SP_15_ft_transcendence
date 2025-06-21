import {GetUserViewModel} from "../../../Presentation/ViewModels/GetUserViewModel.js";

export class GetUserDTO
{
    public readonly uuid: string;
    public readonly email: string;
    public readonly username: string;
    public readonly profilePic: string | null;

    constructor(uuid: string, email: string, username: string, profilepic: string | null = null)
    {
        this.uuid = uuid;
        this.email = email;
        this.username = username;
        this.profilePic = profilepic;
    }
}