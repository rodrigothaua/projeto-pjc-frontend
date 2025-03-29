import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardDesaparecido from '../components/CardDesaparecido';

const Listagem = () => {
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const buscarDesaparecidos = async () => {
      try {
        const resposta = await axios.get(
          `https://abitus-api.geia.vip/pessoas?pagina=${pagina}`
        );
        setDesaparecidos(resposta.data);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
      }
    };

    buscarDesaparecidos();
  }, [pagina]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pessoas Desaparecidas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {desaparecidos.map((pessoa) => ( // Corrigido aqui
          <CardDesaparecido key={pessoa.id} pessoa={pessoa} />
        ))}
      </div>
    </div>
  );
};

export default Listagem;