export interface IBackendApiClient
{
    verifyUserExists(uuid: string[]) : Promise<boolean>;
}