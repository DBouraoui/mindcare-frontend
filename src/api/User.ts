import {BACKEND_URL, getCookie} from "@/lib/utils";
import {updateInformationUserModel, UserEmail, UserInformationModel, UserPassword} from "@/api/models/User-model";

export const updateEmailUser = async (payload : UserEmail) => {
    const response = await fetch(`${BACKEND_URL}/user-email`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer '+ getCookie('auth-token'),
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la modification de l\'email')
    }

    return response.json()
}

export const updatePasswordUser = async (payload : UserPassword) => {
    const response = await fetch(`${BACKEND_URL}/user-password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer '+ getCookie('auth-token'),
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la modification de l\'email')
    }

    return response.json()
}

export const updateInformationUser = async (payload : updateInformationUserModel) => {
    const response = await fetch(`${BACKEND_URL}/user-information`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer '+ getCookie('auth-token'),
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la modification des informations')
    }

    return response.json()
}

export const getUserInformations = async ():Promise<UserInformationModel> => {
    const response = await fetch(`${BACKEND_URL}/get-user-information`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer '+ getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la modification des informations')
    }

    return response.json()
}

export const delteAccountUser = async () => {
    const response = await fetch(`${BACKEND_URL}/user`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer '+ getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la suppression du compte')
    }

    return response.json()
}


export const getDashboardInformation = async () => {
    const response = await fetch(`${BACKEND_URL}/get-dashboard-information`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer '+ getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations du dashboard')
    }

    return response.json()
}