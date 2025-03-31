import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListaDesaparecidos from '../components/ListaDesaparecidos';
import api from '../services/api';  // Importar o objeto api completo

const Search = ({ initialQuery = '' }) => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || initialQuery;
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
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
        // Tentativa 1: Usar buscarPorParametros
        let result;
        try {
          result = await api.buscarPorParametros({  // Use api.buscarPorParametros
            nome: searchTerm,
            pagina: 0
          });
        } catch (err) {
          console.log('Primeira tentativa falhou, tentando método alternativo');
          
          // Tentativa 2: Usar buscarPorNome
          result = await api.buscarPorNome(searchTerm, 0);  // Use api.buscarPorNome
        }

        setDesaparecidos(result.content);
        setDebugInfo({
          searchTerm,
          resultCount: result.content.length,
          totalElements: result.totalElements
        });
        
      } catch (err) {
        console.error('Todas as tentativas falharam:', err);
        
        // Tentativa 3: Último recurso - buscar todos e filtrar no cliente
        try {
          console.log('Tentando buscar todos e filtrar no cliente');
          const allPeople = await api.getPessoas(0);  // Use api.getPessoas
          
          // Filtrar no cliente
          const filtered = allPeople.content.filter(pessoa => 
            pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          setDesaparecidos(filtered);
          setDebugInfo({
            method: 'client-side-filtering',
            searchTerm,
            resultCount: filtered.length,
            totalFetched: allPeople.content.length
          });
          
        } catch (finalError) {
          setError('Não foi possível realizar a busca. Por favor, tente novamente mais tarde.');
          setDebugInfo({
            error: finalError.message,
            originalError: err.message
          });
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchDesaparecidos();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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
          
          <p className="text-center text-gray-500 mt-6">
            Mostrando {desaparecidos.length} resultados
          </p>
        </>
      )}
      
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Informações de depuração - remova em produção */}
      {process.env.NODE_ENV === 'development' && debugInfo && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold mb-2">Informações de Depuração</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Search;
