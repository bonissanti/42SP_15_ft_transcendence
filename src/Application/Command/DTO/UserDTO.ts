export class UserDTO
{
    public Email: string;
    public PasswordHash: string;
    public Username: string;

    constructor(email: string, passwordHash: string, username: string)
    {
        this.Email = email;
        this.PasswordHash = passwordHash;
        this.Username = username;
    }
}