import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Detalhes = () => {
  const { id } = useParams();
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDetalhes = async () => {
      try {
        const resposta = await api.getPessoa(id);
        setDados(resposta);
        setErro(null);
      } catch (error) {
        setErro('Erro ao carregar detalhes do desaparecido');
      } finally {
        setCarregando(false);
      }
    };
    
    carregarDetalhes();
  }, [id]);

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center p-8 bg-red-50 rounded-lg">
          {erro}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className={`p-6 ${dados.situacao === 'DESAPARECIDO' ? 'bg-red-100' : 'bg-green-100'}`}>
          <h1 className="text-3xl font-bold text-gray-800">{dados.nome}</h1>
          <span className="text-sm font-medium">
            {(dados.situacao || 'DESAPARECIDO').toLowerCase()}
          </span>
        </div>

        <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar
          </button>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-medium text-gray-600">Idade</dt>
                <dd className="text-gray-800">{dados.idade || 'Não informada'}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-600">Última localização</dt>
                <dd className="text-gray-800">{dados.ultimaLocalizacao || 'Não informada'}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-600">Data do desaparecimento</dt>
                <dd className="text-gray-800">
                  {dados.dataDesaparecimento 
                    ? new Date(dados.dataDesaparecimento).toLocaleDateString()
                    : 'Não informada'}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Características</h2>
            <p className="text-gray-800 whitespace-pre-line">
              {dados.caracteristicas || 'Nenhuma informação adicional disponível'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalhes;