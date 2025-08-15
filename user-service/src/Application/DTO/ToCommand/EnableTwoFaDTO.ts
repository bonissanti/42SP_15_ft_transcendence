export class EnableTwoFaDTO
{
    constructor(public readonly uuid: string, public readonly code: string){}
}