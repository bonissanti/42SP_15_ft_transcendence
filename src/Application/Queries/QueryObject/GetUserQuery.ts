export class GetUserQuery
{
    public readonly Uuid: string;

    constructor(uuid: string)
    {
        this.Uuid = uuid;
    }
}