import {VerifyTwoFaDTO} from "../../../Application/DTO/ToCommand/VerifyTwoFaDTO.js";

export class VerifyTwoFaCommand
{
    constructor(
        public readonly uuid: string, 
        public readonly code: string,
        public readonly email?: string
    ){}

    public static fromDTO(dto: VerifyTwoFaDTO): VerifyTwoFaCommand
    {
        return new VerifyTwoFaCommand(dto.uuid, dto.code, dto.email);
    }
}
