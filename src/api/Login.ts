import {BACKEND_URL} from "@/lib/utils";
import {LoginModel} from "@/api/models/Login-model";

export const Login = async (payload : LoginModel) => {
    const response = await fetch(`${BACKEND_URL}/login_check`, {
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