import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip/v1',
  timeout: 10000,
});

const normalizePessoa = (pessoa) => ({
  id: pessoa.id,
  nome: pessoa.nome,
  idade: pessoa.idade,
  sexo: pessoa.sexo,
  vivo: pessoa.vivo,
  foto: pessoa.urlFoto,
  dataDesaparecimento: pessoa.ultimaOcorrencia?.dtDesaparecimento,
  localDesaparecimento: pessoa.ultimaOcorrencia?.localDesaparecimentoConcat,
  vestimentas: pessoa.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido,
  informacoes: pessoa.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao,
  situacao: pessoa.vivo ? 'DESAPARECIDO' : 'LOCALIZADO'
});

export default {
  getPessoas: async (pagina = 0) => {
    try {
      const response = await api.get('/pessoas/aberto', {
        params: {
          page: pagina,
          size: 10
        }
      });
      
      return {
        ...response.data,
        content: response.data.content.map(normalizePessoa)
      };
    } catch (error) {
      throw new Error('Erro ao buscar desaparecidos');
    }
  },

  getPessoa: async (id) => {
    try {
      const response = await api.get(`/pessoas/${id}`);
      return normalizePessoa(response.data);
    } catch (error) {
      throw new Error('Erro ao buscar detalhes da pessoa');
    }
  }
};