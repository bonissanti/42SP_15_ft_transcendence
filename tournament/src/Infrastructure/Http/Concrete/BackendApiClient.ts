import {IBackendApiClient} from "../Interface/IBackendApiClient";
import axios from 'axios';

export class BackendApiClient implements IBackendApiClient
{
    private readonly baseUrl: string;

    constructor()
    {
        this.baseUrl = process.env.BACKEND_API_URL || 'http://backend:8080';
    }

    public async verifyUserExists(uuid: string[]) : Promise<boolean>
    {
        try
        {
            const response = await axios.get(`${this.baseUrl}/user/exists/${uuid}`);

            return response.status === 200;
        }
        catch (error)
        {
            if (axios.isAxiosError(error) && error.response?.status === 404)
                return false;

            throw error;
        }
    }
}