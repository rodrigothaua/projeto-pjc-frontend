import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listarDesaparecidos } from '../services/api';

function ListaDesaparecidos() {
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
            const data = await listarDesaparecidos();
            if (data && Array.isArray(data)) {
            setDesaparecidos(data);
            } else {
            setErro('Erro ao buscar dados dos desaparecidos.');
            }
        } catch (error) {
        setErro('Erro ao buscar desaparecidos: ' + error.message);
        }
    }
    fetchData();
  }, []);

  if (erro) {
    return <div>{erro}</div>;
  }

  return (
    <div>
      <h2>Pessoas Desaparecidas</h2>
      <ul>
        {desaparecidos.map((desaparecido) => (
          <li key={desaparecido.id}>
            {desaparecido.nome} - <Link to={`/detalhe/${desaparecido.id}`}>Ver Detalhes</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDesaparecidos;