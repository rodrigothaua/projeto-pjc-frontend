import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardDesaparecido from '../components/CardDesaparecido';

const Listagem = () => {
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarDesaparecidos = async () => {
      try {
        const resposta = await axios.get(
          `https://abitus-api.geia.vip/v1/pessoas/aberto?page=${pagina}`
        );
        
        // Verifique a estrutura da resposta
        console.log('Resposta da API:', resposta.data);
        
        if (resposta.data && resposta.data.content) {
          setDesaparecidos(resposta.data.content);
        }
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarDesaparecidos();
  }, [pagina]);

  if (carregando) {
    return <div>Carregando desaparecidos...</div>;
  }

  if (erro) {
    return <div>Erro ao carregar dados: {erro}</div>;
  }

  if (!desaparecidos.length) {
    return <div>Nenhum desaparecido encontrado</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pessoas Desaparecidas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {desaparecidos.map((pessoa) => (
          <CardDesaparecido key={pessoa.id} pessoa={pessoa} />
        ))}
      </div>
    </div>
  );
};

export default Listagem;