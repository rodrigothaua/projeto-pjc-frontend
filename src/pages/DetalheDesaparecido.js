import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { buscaDesaparecidoPorId } from '../services/api';

function DetalheDesaparecido() {
  const { id } = useParams();
  const [desaparecido, setDesaparecido] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await buscaDesaparecidoPorId(id);
        if (data) {
          setDesaparecido(data);
        } else {
          setErro('Pessoa desaparecida não encontrada.');
        }
      } catch (error) {
        setErro('Erro ao buscar detalhes do desaparecido: ' + error.message);
      }
    }
    fetchData();
  }, [id]);

  if (erro) {
    return <div>{erro}</div>;
  }

  if (!desaparecido) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Detalhes do Desaparecido</h2>
      <p>Nome: {desaparecido.nome}</p>
      {/* Exiba outros detalhes aqui */}
    </div>
  );
}

export default DetalheDesaparecido;