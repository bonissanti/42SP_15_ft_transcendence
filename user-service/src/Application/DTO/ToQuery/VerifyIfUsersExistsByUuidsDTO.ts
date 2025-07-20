export class VerifyIfUsersExistsByUuidsDTO
{
    constructor(public readonly Uuids: (string | null)[])
    {
    }
}