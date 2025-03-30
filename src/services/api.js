import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip/v1',
  timeout: 10000,
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

export default {
  getPessoa: async (id) => {
    try {
      const response = await api.get(`/pessoas/${id}`);
      return {
        ...response.data,
        situacao: response.data.situacao || 'DESAPARECIDO', // Valor padrão
        dataDesaparecimento: response.data.dataDesaparecimento || null
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar detalhes da pessoa');
    }
  },

  listPessoasAberto: async (params) => {
    try {
      const response = await api.get('/pessoas/aberto', { params });
      return {
        ...response.data,
        content: response.data.content.map(pessoa => ({
          ...pessoa,
          situacao: pessoa.situacao || 'DESAPARECIDO'
        }))
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao listar desaparecidos');
    }
  },

  enviarInformacao: async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'arquivos') {
          value.forEach(file => formData.append('arquivos', file));
        } else {
          formData.append(key, value);
        }
      });
      
      const response = await api.post('/ocorrencias/informacoes-desaparecido', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao enviar informações');
    }
  }
};