import {PasswordHashVO} from "../../ValueObjects/PasswordHashVO";

export interface IUser
{
    Email: string;
    PasswordHash: PasswordHashVO;
    Username: string;
}