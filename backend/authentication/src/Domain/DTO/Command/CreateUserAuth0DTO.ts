export class CreateUserAuth0DTO
{
    public readonly email: string;
    public readonly auth0Id: string;
    public readonly username: string;
    public readonly profilePic: string | null = null;

    constructor (_email: string, _auth0Id: string, _username: string, _profilepic: string | null)
    {
        this.email = _email;
        this.auth0Id = _auth0Id;
        this.username = _username;
        this.profilePic = _profilepic;
    }
}