import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { buscarDesaparecidoPorId } from '../services/api';

function DetalheDesaparecido() {
  const { id } = useParams();
  const [desaparecido, setDesaparecido] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await buscarDesaparecidoPorId(id);
      if (data) {
        setDesaparecido(data);
      }
    }
    fetchData();
  }, [id]);

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