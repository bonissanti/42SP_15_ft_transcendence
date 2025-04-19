export class UserViewModel
{
    public readonly Uuid: string;
    public readonly Username: string;
    public readonly Email: string;
    public readonly PasswordHash: string;
    public readonly ProfilePic: string | null;

    constructor(Uuid: string, Username: string, Email: string, PasswordHash: string, ProfilePic: string | null = null)
    {
        this.Uuid = Uuid;
        this.Username = Username;
        this.Email = Email;
        this.PasswordHash = PasswordHash;
        this.ProfilePic = ProfilePic;
    }
}