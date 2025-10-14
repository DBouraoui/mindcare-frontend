import {BACKEND_URL} from "@/lib/utils";
import {RegisterClientModel} from "@/api/models/Register-model";

export const createClient = async (payload : RegisterClientModel) => {
    const response = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error('Erreur lors de l’inscription à la newsletter')
    }

    return response.json()
}
