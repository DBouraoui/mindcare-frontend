export const createNewsLetter = async (email: string) => {
    const response = await fetch('http://localhost:8000/api/create-newsletter', {
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
