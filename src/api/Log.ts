import {BACKEND_URL, getCookie} from "@/lib/utils";
import {LogsModel} from "@/api/models/Logs-model";

export const getUserLogsInformations = async ():Promise<LogsModel[]> => {
    const response = await fetch(`${BACKEND_URL}/user-session`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer '+ getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la modification des logs de connexion')
    }

    return response.json()
}