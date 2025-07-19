import {IBackendApiClient} from "../Interface/IBackendApiClient";
import axios from 'axios';
import {GetUserMatchmakingQueryDTO} from "../../../Domain/QueryDTO/GetUserMatchmakingQueryDTO";

export class BackendApiClient implements IBackendApiClient
{
    private readonly baseUrl: string;

    constructor()
    {
        //TODO: voltar para o url do BACKEND depois, esse debaixo foi para testar
        this.baseUrl = process.env.BACKEND_API_URL || 'http://127.0.0.1:8080';
    }

    public async VerifyIfUsersExists(uuids: string[]) : Promise<boolean>
    {
        try
        {
            const response = await axios.get(`${this.baseUrl}/users/exists/`, {
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

    //Não implementado
    public async VerifyIfUserExists(uuid: string): Promise<boolean>
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

    //TODO: implementar
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

    //TODO: implementar
    public async AddWinLoseForUser(player1Username: string, player1Points: number, player2Username: string, player2Points: number): Promise<boolean>
    {
        try
        {
            const response = await axios.get(`${this.baseUrl}/user/winLose`, {
                params: { player1Username: player1Username, player1Points: player1Points, player2Username: player2Username, player2Points: player2Points }
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