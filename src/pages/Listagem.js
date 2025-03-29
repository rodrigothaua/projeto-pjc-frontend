import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardDesaparecido from '../components/CardDesaparecido';

const Listagem = () => {
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarDesaparecidos = async () => {
      try {
        setCarregando(true);
        const resposta = await axios.get(
          `https://abitus-api.geia.vip/v1/pessoas/aberto`,
          {
            params: {
              page: pagina - 1,
              size: 12
            }
          }
        );

        setDesaparecidos(resposta.data.content);
        setTotalPaginas(resposta.data.totalPages);
        setErro(null);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        setErro('Erro ao carregar desaparecidos');
      } finally {
        setCarregando(false);
      }
    };

    buscarDesaparecidos();
  }, [pagina]);

  const gerarBotoesPaginas = () => {
    return Array.from({ length: totalPaginas }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => setPagina(i + 1)}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          pagina === i + 1
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {i + 1}
      </button>
    ));
  };

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
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Pessoas Desaparecidas
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {desaparecidos.map((pessoa) => (
          <CardDesaparecido key={pessoa.id} pessoa={pessoa} />
        ))}
      </div>

      {/* Paginação */}
      <div className="mt-8 flex justify-center gap-2">
        {gerarBotoesPaginas()}
      </div>
    </div>
  );
};

export default Listagem;