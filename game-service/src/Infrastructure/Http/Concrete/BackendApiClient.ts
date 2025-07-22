import {IBackendApiClient} from "../Interface/IBackendApiClient";
import axios from 'axios';
import {GetUserMatchmakingQueryDTO} from "../../../Domain/QueryDTO/GetUserMatchmakingQueryDTO";
import {UpdateStatsExternalDTO} from "../../../Domain/ExternalDTO/UpdateStatsExternalDTO";

export class BackendApiClient implements IBackendApiClient
{
    private readonly baseUrl: string;

    constructor()
    {
        //TODO: voltar para o url do BACKEND depois, esse debaixo foi para testar
        this.baseUrl = process.env.BACKEND_API_URL || 'http://user-service:8080';
    }

    public async VerifyIfUsersExistsByUsername(usernames: (string | null)[]): Promise<boolean> {
        try {
            // 1. Filtra para remover nulos/vazios e junta o array em uma única string
            const usernamesAsString = usernames.filter(u => u != null && u !== '').join(',');

            // 2. Se não houver usernames válidos, retorna false para evitar uma chamada desnecessária
            if (!usernamesAsString) {
                return false;
            }
            
            // 3. Envia a string como o valor do parâmetro 'usernames'
            const response = await axios.get(`${this.baseUrl}/users/exists/usernames`, {
                params: { usernames: usernamesAsString }
            });

            return response.status === 200;
        } catch (error) {
            // Agora o erro 400 também será tratado como "usuário não encontrado" ou falha
            if (axios.isAxiosError(error) && (error.response?.status === 404 || error.response?.status === 400)) {
                console.error("Error from user-service:", error.response?.data);
                return false;
            }
            throw error; // Lança outros erros (como 500)
        }
    }



    public async VerifyIfUserExistsByUuid(uuid: string): Promise<boolean>
    {
        try
        {
            const response = await axios.get(`${this.baseUrl}/users/:${uuid}`, {
                params: { uuid: uuid }
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

    public async VerifyIfUserExistsByUsername(username: string): Promise<boolean>
    {
        try
        {
            const response = await axios.get(`${this.baseUrl}/users/:${username}`, {
                params: { uuid: username }
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

    public async UpdateStatsForUsers(updateStatsExternalDTO: UpdateStatsExternalDTO): Promise<boolean>
    {
        try
        {
            const response = await axios.put(`${this.baseUrl}/user/updateStats`, updateStatsExternalDTO);
            return response.status === 200;
        }
        catch (error)
        {
            if (axios.isAxiosError(error) && error.response?.status === 404)
                return false;

            throw error;
        }
    }

    public async SearchForOpponent(username: string, wins: number, totalGames: number) : Promise<GetUserMatchmakingQueryDTO | null>
    {
        try
        {
            const response = await axios.get(`${this.baseUrl}/matchmaking`, {
                params: {username: username, wins: wins, totalGames: totalGames}
            });

            if (response.status !== 200)
                return null;
            return response.data;
        }
        catch (error)
        {
            if (axios.isAxiosError(error) && error.response?.status === 404)
                return null;

            throw error;
        }
    }
}