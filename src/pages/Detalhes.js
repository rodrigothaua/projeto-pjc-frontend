import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import ModalImagem from '../components/ModalImagem';

const Detalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const carregarDetalhes = async () => {
      try {
        const resposta = await api.getPessoa(id);
        
        if (!resposta) {
          throw new Error('Dados não encontrados');
        }

        setDados({
          ...resposta,
          dataFormatada: resposta.dataDesaparecimento 
            ? new Date(resposta.dataDesaparecimento).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            : 'Data desconhecida'
        });

      } catch (error) {
        setErro(error.message);
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

  if (!dados) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Cabeçalho com espaçamento */}
        <div className={`p-6 ${dados.vivo ? 'bg-red-100' : 'bg-green-100'} flex justify-between items-start`}>
          {/* Foto à esquerda */}
          <div className='flex justify-center cursor-zoom-in'>
            <img
              src={dados.foto}
              alt={`Foto de ${dados.nome}`}
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
              onClick={() => setModalAberto(true)}
              onError={(e) => e.target.src = '/images/placeholder.png'}
            />
          </div>
          <ModalImagem
              aberto={modalAberto}
              onFechar={() => setModalAberto(false)}
              imagemUrl={dados.foto || '/images/placeholder.png'}
              nome={dados.nome}
            />
          {/* Informações principais */}
          <div className="ml-4 flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{dados.nome}</h1>
            <div className="mt-2 flex items-center gap-3">
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                dados.vivo ? 'bg-red-700 text-white' : 'bg-green-700 text-white'
              }`}>
                {(dados.situacao || 'DESAPARECIDO').toLowerCase()}
              </span>
              <span className="text-sm text-gray-600">
                {dados.idade ? `${dados.idade} anos` : 'Idade não informada'}
              </span>
              <span className="text-sm text-gray-600">
                {dados.sexo?.toLowerCase() || 'Sexo não informado'}
              </span>
            </div>
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
        </div>

        {/* Corpo Principal */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna Esquerda */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">📅 Linha do Tempo</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="font-medium text-gray-600">Data/Hora do Desaparecimento</dt>
                  <dd className="text-gray-800">
                    {dados.dataFormatada}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Última Localização</dt>
                  <dd className="text-gray-800">
                    {dados.localDesaparecimento || 'Localizaçõo não informada'}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">👕 Vestimentas</h2>
              <p className="text-gray-800 whitespace-pre-line">
                {dados.vestimentas}
              </p>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">📝 Detalhes do Caso</h2>
              <p className="text-gray-800 whitespace-pre-line">
                {dados.informacoes}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">📍 Local do Desaparecimento</h2>
              <p className="text-gray-800">
                {dados.localDesaparecimento}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <Link 
                to={`/informacoes/${id}`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Enviar Informações
              </Link>
            </div>
          </div>
        </div>

        {/* Seção de Fotos com ampliação */}
        {dados.urlFoto && (
          <div className="p-6 border-t border-gray-100">
            <h2 className="text-xl font-semibold mb-4">📸 Foto Registrada</h2>
            <div 
              className="flex justify-center cursor-zoom-in"
              onClick={() => setModalAberto(true)}
            >
              <img
                src={dados.urlFoto}
                alt={`Foto de ${dados.nome}`}
                className="max-w-full h-96 object-contain rounded-lg shadow-md hover:shadow-lg transition-shadow"
                onError={(e) => e.target.src = '/images/placeholder.png'}
              />
            </div>
            
            <ModalImagem
              aberto={modalAberto}
              onFechar={() => setModalAberto(false)}
              imagemUrl={dados.urlFoto || '/images/placeholder.png'}
              nome={dados.nome}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Detalhes;