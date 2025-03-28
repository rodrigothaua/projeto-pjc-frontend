import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip/v1',
});

const handleApiError = (error, errorMessage) => {
  console.error(errorMessage, error);
  return null;
}

export const listarDesaparecidos = async () => {
    try {
        const response = await api.get('/pessoas/aberto')
        return response.data
    }
    catch (error) {
        return handleApiError(error, 'Erro ao buscar desaparecidos:');
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

export const listarInformacoesDesaparecido = async (ocorrenciaId) => {
    try {
        const response = await api.get(`/ocorrencias/informacoes-desaparecido?ocorrenciaId=${ocorrenciaId}`)
        return response.data
    }
    catch (error) {
        return handleApiError(error, 'Erro ao listar informações do desaparecido:');
    }
}

export const enviarInformacoesDesaparecido = async (formData) => {
    try {
        const response = await api.post('/ocorrencias/informacoes-desaparecido', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Informações enviadas com sucesso:', response.data);
        return true;
    } catch (error) {
        handleApiError(error, 'Erro ao enviar informações:');
        return false;
    }
}

export default api;