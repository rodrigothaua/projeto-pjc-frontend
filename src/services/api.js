import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip/v1',
  timeout: 10000,
});

// Interceptor para autenticação
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Autenticação
  login: (credentials) => api.post('/login', credentials),
  refreshToken: () => api.post('/refresh-token'),

  // Pessoas
  getPessoa: (id) => api.get(`/pessoas/${id}`),
  listPessoasAberto: (params) => api.get('/pessoas/aberto', { params }),
  searchPessoas: (filters) => api.get('/pessoas/aberto/filtro', { params: filters }),

  // Ocorrências
  enviarInformacao: (data) => api.post('/ocorrencias/informacoes-desaparecido', data),
  getMotivos: () => api.get('/ocorrencias/motivos'),

  // Arquivos
  getArquivo: (id) => api.get(`/arquivos/${id}`)
};