import {PasswordHashVO} from "../../ValueObjects/PasswordHashVO";
import {EmailVO} from "../../ValueObjects/EmailVO";

export interface IUser
{
    Email: string;
    PasswordHash: PasswordHashVO;
    Username: string;
}