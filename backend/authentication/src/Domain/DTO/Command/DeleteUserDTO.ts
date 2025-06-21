export class DeleteUserDTO
{
    public readonly Uuid: string;

    constructor(uuid: string)
    {
        this.Uuid = uuid;
    }
}