import {GetAllTournamentsQueryDTO} from "../../../Domain/QueryDTO/GetAllTournamentsQueryDTO";
import {GetAllTournamentsDTO} from "../../DTO/ToQuery/GetAllTournamentsDTO";

export class GetAllTournamentsQuery
{
    public readonly userUuid: string;

    constructor(userUuid: string)
    {
        this.userUuid = userUuid;
    }

    public static fromDTO(queryDTO: GetAllTournamentsDTO): GetAllTournamentsQuery
    {
        return new GetAllTournamentsQuery(queryDTO.userUuid);
    }
}