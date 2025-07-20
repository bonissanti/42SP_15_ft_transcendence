import {VerifyIfUsersExistsByUuidsDTO} from "../../../Application/DTO/Query/VerifyIfUsersExistsByUuidsDTO.js";

export class VerifyIfUsersExistsByUuidsQuery
{
    constructor(public readonly Uuids: string[])
    {
    }

    public static FromDTO(dto: VerifyIfUsersExistsByUuidsDTO): VerifyIfUsersExistsByUuidsDTO
    {
        return new VerifyIfUsersExistsByUuidsDTO(dto.Uuids);
    }
}