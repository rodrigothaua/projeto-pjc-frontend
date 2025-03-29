import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip/v1',
  timeout: 10000,
});

export const buscarDesaparecidos = async (pagina = 1) => {
  try {
    const resposta = await api.get('/pessoas/aberto', {
      params: {
        page: pagina,
        size: 10
      }
    });
    return resposta.data;
  } catch (erro) {
    console.error('Erro na requisição:', erro);
    throw erro;
  }
};

export const buscarDetalhesDesaparecido = async (id) => {
  try {
    const resposta = await api.get(`/pessoas/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error('Erro ao buscar detalhes:', erro);
    throw erro;
  }
};