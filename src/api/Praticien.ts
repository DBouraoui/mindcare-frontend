import {BACKEND_URL, getCookie} from "@/lib/utils";
import {PraticienFavorisModel} from "@/api/models/Praticien-model";

export const getPraticienListing = async (payload: string) => {
    const response = await fetch(`${BACKEND_URL}/get-praticien-listing?query=`+ encodeURIComponent(payload), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer `+ getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération du listing des praticien')
    }

    return response.json()
}

export const getAllPraticienListing = async () => {
    const response = await fetch(`${BACKEND_URL}/get-all-praticien-listing`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer `+ getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération du listing des praticien')
    }

    return response.json()
}

export const getPraticienInformation = async (payload: string) => {
    const response = await fetch(`${BACKEND_URL}/get-praticien-information/`+ encodeURIComponent(payload), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer `+ getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des information du praticien')
    }

    return response.json()
}

export const createFavoritePraticien = async (payload: string) => {
    const response = await fetch(`${BACKEND_URL}/favorite-pro?proId=`+ encodeURIComponent(payload), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer `+ getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la mise en favorie du praticien')
    }

    return response.json()
}

export const getPraticienFavoris = async (): Promise<PraticienFavorisModel[]> => {
    const response = await fetch(`${BACKEND_URL}/favorite`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer `+ getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des favories')
    }

    return response.json()
}

export const removePraticienFavorite = async (payload :string) => {
    const response = await fetch(`${BACKEND_URL}/favorite-pro?proId=` +encodeURIComponent(payload), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer `+ getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la suppression du favorie')
    }

    return response.json()
}

export const removePraticienFavoriteById = async (payload :string) => {
    const response = await fetch(`${BACKEND_URL}/favorite-pro/` +encodeURIComponent(payload), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer `+ getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la suppression du favorie')
    }

    return response.json()
}
