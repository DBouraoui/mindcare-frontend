import {BACKEND_URL, getCookie} from "@/lib/utils";
import {ProModels, ScheduleProModel, UpdateScheduleProModel} from "@/api/models/Pro-models";

export const getProInformation = async (): Promise<ProModels> => {
    const response = await fetch(`${BACKEND_URL}/get-pro-information`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer '+ getCookie('auth-token')
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des information professionel')
    }

    return response.json()
}

export const updateProInformation = async (payload : ProModels) => {
    const response = await fetch(`${BACKEND_URL}/user-pro`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer '+getCookie('auth-token')
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la modifications des information professionel')
    }

    return response.json()
}

export const getProschedulesInformations = async (): Promise<ScheduleProModel[]> => {
    const response = await fetch(`${BACKEND_URL}/get-schedules`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer '+getCookie('auth-token')
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des horraires pro')
    }

    return response.json()
}

export const updateProSchedulesInformations = async (payload: UpdateScheduleProModel) => {
    const response = await fetch(`${BACKEND_URL}/update-schedules`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer '+getCookie('auth-token')
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des horraires pro')
    }

    return response.json()
}