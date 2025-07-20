import {VerifyIfUsersExistsByUuidsDTO} from "../../../Application/DTO/ToQuery/VerifyIfUsersExistsByUuidsDTO.js";
import {VerifyIfUsersExistsByUsernamesDTO} from "../../../Application/DTO/ToQuery/VerifyIfUsersExistsByUsernamesDTO.js";

export class VerifyIfUsersExistsByUsernamesQuery
{
    constructor(public readonly Usernames: (string | null)[])
    {
    }

    public static FromDTO(dto: VerifyIfUsersExistsByUsernamesDTO): VerifyIfUsersExistsByUsernamesQuery
    {
        return new VerifyIfUsersExistsByUsernamesQuery(dto.Usernames);
    }
}