import {BACKEND_URL} from "@/lib/utils";
import {createContactInterface} from "@/api/models/Contact-model";

export const createContact = async (contact : createContactInterface) => {
    const response = await fetch(`${BACKEND_URL}/create-contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(contact),
    })

    if (!response.ok) {
        throw new Error('Erreur lors de l’inscription à la contact')
    }

    return response.json()
}
