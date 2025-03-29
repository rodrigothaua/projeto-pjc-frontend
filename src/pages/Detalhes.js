import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detalhes = () => {
  const { id } = useParams();
  const [desaparecido, setDesaparecido] = useState(null);

  useEffect(() => {
    const buscarDetalhes = async () => {
      try {
        const resposta = await axios.get(
          `https://abitus-api.geia.vip/pessoas/${id}`
        );
        setDesaparecido(resposta.data);
      } catch (erro) {
        console.error('Erro ao buscar detalhes:', erro);
      }
    };

    buscarDetalhes();
  }, [id]);

  if (!desaparecido) return <div>Carregando...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{desaparecido.nome}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Idade: {desaparecido.idade}</p>
        <p>Última localização: {desaparecido.ultimaLocalizacao}</p>
        <p>Data do desaparecimento: {desaparecido.dataDesaparecimento}</p>
      </div>
    </div>
  );
};

export default Detalhes;