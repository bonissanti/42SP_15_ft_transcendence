export interface IUserServiceClient
{
    VerifyIfUsersExistsByUsername(uuid: string[]) : Promise<boolean>;
    GetUsersByUuids(uuids: string[]): Promise<any>;
}