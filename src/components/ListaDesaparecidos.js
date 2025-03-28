import React, { useState, useEffect } from 'react';
import { listarDesaparecidos } from '../services/api';

function ListaDesaparecidos() {
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true); // Novo estado para o indicador de carregamento

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
      } finally {
        setCarregando(false); // Define carregando como falso após a conclusão da busca
      }
    }
    fetchData();
  }, []);

  if (carregando) {
    return <div>Carregando...</div>; // Exibe o indicador de carregamento
  }

  if (erro) {
    return <div>{erro}</div>;
  }

  return (
    <div>
      <h2>Pessoas Desaparecidas</h2>
        <ul>
            {desaparecidos.map((desaparecido) => (
                <li key={desaparecido.id}>
                <img src={desaparecido.urlFoto} alt={desaparecido.nome} />
                <h3>{desaparecido.nome}</h3>
                <p>Idade: {desaparecido.idade}</p>
                <p>Local de desaparecimento: {desaparecido.ultimaOcorrencia.localDesaparecimentoConcat}</p>
                {/* Outros dados */}
                </li>
            ))}
        </ul>
    </div>
  );
}

export default ListaDesaparecidos;