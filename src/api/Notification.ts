import {BACKEND_URL, getCookie} from "@/lib/utils";
import {ReadNotificationModel} from "@/api/models/Notification-models.";

export const getNotifications = async () => {
    const response = await fetch(`${BACKEND_URL}/notifications`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur l\'or de la récupération des notifications');
    }

    return response.json()
}

export const readNotification = async (payload : ReadNotificationModel) => {
    const response = await fetch(`${BACKEND_URL}/notification`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getCookie('auth-token'),
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        throw new Error('Erreur l\'or de la lecture de la notification');
    }

    return response.json()
}