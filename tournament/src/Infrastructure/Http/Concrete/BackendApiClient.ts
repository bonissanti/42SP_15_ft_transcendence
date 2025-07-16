import {IBackendApiClient} from "../Interface/IBackendApiClient";
import axios from 'axios';

export class BackendApiClient implements IBackendApiClient
{
    private readonly baseUrl: string;

    constructor()
    {
        //TODO: voltar para o url do BACKEND depois, esse debaixo foi para testar
        this.baseUrl = process.env.BACKEND_API_URL || 'http://127.0.0.1:8080';
    }

    public async verifyUserExists(uuids: string[]) : Promise<boolean>
    {
        try
        {
            const response = await axios.get(`${this.baseUrl}/user/exists/`, {
                params: { uuids: uuids }
            });

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