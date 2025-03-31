import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip/v1',
  timeout: 10000,
});

const normalizePessoa = (pessoa) => ({
  id: pessoa.id,
  nome: pessoa.nome || 'Nome não informado',
  idade: pessoa.idade ?? 'Idade não informada',
  sexo: (pessoa.sexo || 'Não informado').toLowerCase(),
  vivo: pessoa.vivo ?? false,
  foto: pessoa.urlFoto || '/images/placeholder.png',
  dataDesaparecimento: pessoa.ultimaOcorrencia?.dtDesaparecimento || null,
  localDesaparecimento: pessoa.ultimaOcorrencia?.localDesaparecimentoConcat || 'Local desconhecido',
  vestimentas: pessoa.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || 'Não informado',
  informacoes: pessoa.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao || 'Nenhuma informação adicional',
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
      throw new Error(error.response?.data?.message || 'Erro ao listar desaparecidos');
    }
  },

  getPessoa: async (id) => {
    try {
      const response = await api.get(`/pessoas/${id}`);
      return normalizePessoa(response.data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar detalhes da pessoa');
    }
  },

  enviarInformacao: async (dados) => {
    try {
      const formData = new FormData();
      
      // Anexar arquivos
      if (dados.arquivos) {
        dados.arquivos.forEach((arquivo) => {
          formData.append('arquivos', arquivo);
        });
      }
      
      // Anexar outros campos
      Object.entries(dados).forEach(([key, value]) => {
        if (key !== 'arquivos') {
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
  },

  buscarPorParametros: async (params) => {
    try {
      const response = await api.get('/pessoas/buscar', {
        params: {
          ...params,
          page: params.pagina || 0,
          size: 10
        }
      });
      
      return {
        ...response.data,
        content: response.data.content.map(normalizePessoa)
      };
    } catch (error) {
      console.error('Erro detalhado:', error);
      throw new Error(error.response?.data?.message || 'Erro na busca filtrada');
    }
  }

  
};