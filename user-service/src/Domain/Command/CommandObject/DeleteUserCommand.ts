import {DeleteUserDTO} from "../../../Application/DTO/Command/DeleteUserDTO.js";

export class DeleteUserCommand
{
    public readonly Uuid: string;

    constructor(uuid: string)
    {
        this.Uuid = uuid;
    }

    public static FromDTO(dto: DeleteUserDTO): DeleteUserCommand
    {
        return new DeleteUserCommand(dto.Uuid);
    }
}