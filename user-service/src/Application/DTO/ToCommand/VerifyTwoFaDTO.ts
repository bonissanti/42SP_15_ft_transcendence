export class VerifyTwoFaDTO
{
    constructor(
        public readonly uuid: string, 
        public readonly code: string,
        public readonly email?: string
    ){}
}
