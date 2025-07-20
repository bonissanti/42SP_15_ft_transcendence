export interface IBackendApiClient
{
    VerifyIfUsersExists(uuid: string[]) : Promise<boolean>;
}