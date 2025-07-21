export interface IBackendApiClient
{
    VerifyIfUsersExistsByUsername(uuid: string[]) : Promise<boolean>;
}