import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

export const listarDesaparecidos = async () => {
    try {
        const response = await api.get('/pessoas')
        return response.data
    }
    catch (error) {
        console.error('Erro ao buscar desaparecidos:', error)
        return []
    }
}

export const buscaDesaparecidoPorId = async (id) => {
    try {
        const response = await api.get(`/pessoas/${id}`)
        return response.data
    }
    catch (error) {
        console.error('Erro ao buscar desaparecido:', error)
        return null
    }
}

export default api;