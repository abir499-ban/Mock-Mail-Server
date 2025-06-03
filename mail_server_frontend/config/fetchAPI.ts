

const BACKEND_BASE_URL = 'http://localhost:8000'

export const fetchMethods = {
    post: async (path: string, body: any, headers = { 'Content-Type': 'application/json' }) => {
        try {
            const res = await fetch(BACKEND_BASE_URL + path, {
                method: 'POST',
                headers: headers,
                body: body
            })
            const response = await res.json()
            if (res.ok && response) return response
            else return null
        } catch (error) {
            throw error
        }
    }
}