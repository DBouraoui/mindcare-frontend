import {BACKEND_URL, getCookie} from "@/lib/utils";
import {
    AllConversationmodel,
    CreateConversationModel,
    CreateMessageModel
} from "@/api/models/Messagerie-model";

export const CreateConversation = async (payload : CreateConversationModel) => {
    const response = await fetch(`${BACKEND_URL}/create-conversation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer `+ getCookie('auth-token'),

        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la création de la conversation')
    }

    return response.json()
}

export const GetConversation = async () => {
    const response = await fetch(`${BACKEND_URL}/get-conversation`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer `+ getCookie('auth-token'),

        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la création de la conversation')
    }

    return response.json()
}

export const GetAllMessage = async (payload :string): Promise<AllConversationmodel[]> => {
    const response = await fetch(`${BACKEND_URL}/messages/`+ encodeURIComponent(payload), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer `+ getCookie('auth-token'),

        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la création de la conversation')
    }

    return response.json()
}

export const SendMessage = async (payload :CreateMessageModel) => {
    const response = await fetch(`${BACKEND_URL}/create-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer `+ getCookie('auth-token'),
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la création de la conversation')
    }

    return response.json()
}