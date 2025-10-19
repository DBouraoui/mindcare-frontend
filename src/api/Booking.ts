import {BACKEND_URL, getCookie} from "@/lib/utils";
import {BookingProModel} from "@/api/models/Booking-model";

export const GetBooking = async () => {
    const response = await fetch(`${BACKEND_URL}/get-booking`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des réservation')
    }

    return response.json()
}

export const DeleteBooking = async (payload :string) => {
    const response = await fetch(`${BACKEND_URL}/delete-booking/`+encodeURIComponent(payload), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getCookie('auth-token'),
        }
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la reservation')
    }

    return response.json()
}