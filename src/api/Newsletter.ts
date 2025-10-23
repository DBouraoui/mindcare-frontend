import {BACKEND_URL, getCookie} from "@/lib/utils";

export const createNewsLetter = async (email: string) => {
    const response = await fetch(`${BACKEND_URL}/create-newsletter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
    })

    if (!response.ok) {
        throw new Error('Erreur lors de l’inscription à la newsletter')
    }

    return response.json()
}

export const updateNewsletter = async () => {
    const response = await fetch(`${BACKEND_URL}/newsletter`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer `+getCookie('auth-token'),
        },
    })

    if (!response.ok) {
        throw new Error('Erreur lors de l’inscription à la newsletter')
    }

    return response.json()
}
