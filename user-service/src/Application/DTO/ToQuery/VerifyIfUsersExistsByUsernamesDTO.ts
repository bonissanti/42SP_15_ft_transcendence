export class VerifyIfUsersExistsByUsernamesDTO
{
    constructor(public readonly Usernames: (string | null)[])
    {
    }
}