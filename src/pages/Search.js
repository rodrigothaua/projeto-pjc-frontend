import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListaDesaparecidos from '../components/ListaDesaparecidos';
import api from '../services/api';

const Search = ({ initialQuery = '' }) => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || initialQuery;
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  });

  useEffect(() => {
    // Atualiza o termo de pesquisa quando o parâmetro da URL muda
    setSearchTerm(queryParam);
  }, [queryParam]);

  useEffect(() => {
    const fetchDesaparecidos = async () => {
      if (!searchTerm.trim()) {
        setDesaparecidos([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Usando o método buscarPorParametros do seu serviço API
        const result = await api.buscarPorParametros({
          nome: searchTerm,
          pagina: 0
          // Adicione outros parâmetros conforme necessário
        });

        setDesaparecidos(result.content);
        setPagination({
          currentPage: result.number,
          totalPages: result.totalPages,
          totalElements: result.totalElements
        });
      } catch (err) {
        console.error('Erro ao buscar desaparecidos:', err);
        setError(err.message || 'Ocorreu um erro ao buscar os dados. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce para evitar chamadas excessivas à API
    const timer = setTimeout(() => {
      fetchDesaparecidos();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Função para carregar mais resultados (paginação)
  const loadMoreResults = async () => {
    if (loading || pagination.currentPage >= pagination.totalPages - 1) return;
    
    setLoading(true);
    
    try {
      const nextPage = pagination.currentPage + 1;
      const result = await api.buscarPorParametros({
        nome: searchTerm,
        pagina: nextPage
      });
      
      setDesaparecidos(prev => [...prev, ...result.content]);
      setPagination({
        currentPage: result.number,
        totalPages: result.totalPages,
        totalElements: result.totalElements
      });
    } catch (err) {
      console.error('Erro ao carregar mais resultados:', err);
      setError(err.message || 'Erro ao carregar mais resultados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Resultados da Pesquisa</h1>
      
      {searchTerm && (
        <p className="mb-4 text-gray-600">
          Mostrando resultados para: <span className="font-semibold">{searchTerm}</span>
        </p>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && desaparecidos.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-600">Nenhum resultado encontrado para "{searchTerm}".</p>
          <p className="mt-2 text-gray-500">Tente outro termo de pesquisa.</p>
        </div>
      )}

      {!loading && !error && desaparecidos.length > 0 && (
        <>
          <ListaDesaparecidos desaparecidos={desaparecidos} />
          
          {pagination.currentPage < pagination.totalPages - 1 && (
            <div className="text-center mt-8">
              <button
                onClick={loadMoreResults}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? 'Carregando...' : 'Carregar mais resultados'}
              </button>
            </div>
          )}
          
          <p className="text-center text-gray-500 mt-4">
            Mostrando {desaparecidos.length} de {pagination.totalElements} resultados
          </p>
        </>
      )}
      
      {loading && desaparecidos.length === 0 && (
        <div className="text-center py-8">
          <p>Carregando resultados...</p>
        </div>
      )}
    </div>
  );
};

export default Search;
