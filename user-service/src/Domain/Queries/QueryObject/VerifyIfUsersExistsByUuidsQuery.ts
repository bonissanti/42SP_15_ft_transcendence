import {VerifyIfUsersExistsByUuidsDTO} from "../../../Application/DTO/ToQuery/VerifyIfUsersExistsByUuidsDTO.js";

export class VerifyIfUsersExistsByUuidsQuery
{
    constructor(public readonly Uuids: (string | null)[])
    {
    }

    public static FromDTO(dto: VerifyIfUsersExistsByUuidsDTO): VerifyIfUsersExistsByUuidsQuery
    {
        return new VerifyIfUsersExistsByUuidsQuery(dto.Uuids);
    }
}