import {BACKEND_URL, getCookie} from "@/lib/utils";
import {CreateConversationModel} from "@/api/models/Messagerie-model";

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