export interface IUserServiceClient
{
    VerifyIfUsersExistsByUsername(uuid: string[]) : Promise<boolean>;
}