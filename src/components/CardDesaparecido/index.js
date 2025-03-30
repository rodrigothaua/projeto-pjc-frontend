import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CardDesaparecido = ({ pessoa }) => {
  const getDadosFormatados = () => ({
    nome: pessoa.nome || 'Nome não informado',
    idade: pessoa.idade ?? 'Idade não informada',
    sexo: (pessoa.sexo || 'Não informado').toLowerCase(),
    situacao: pessoa.situacao?.toLowerCase() || 'desaparecido',
    foto: pessoa.foto || '/placeholder.jpg',
    dataDesaparecimento: pessoa.dataDesaparecimento 
      ? new Date(pessoa.dataDesaparecimento).toLocaleDateString('pt-BR')
      : 'Data desconhecida',
    local: pessoa.localDesaparecimento || 'Local não informado',
    vestimentas: pessoa.vestimentas || 'Vestimentas não informadas'
  });

  const dados = getDadosFormatados();

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
      <img 
        src={dados.foto}
        alt={dados.nome}
        className="w-full h-48 object-cover border-b border-gray-100"
        onError={(e) => e.target.src = '/images/placeholder.png'}
      />
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 truncate mb-2">
          {dados.nome}
        </h3>
        
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              dados.situacao === 'desaparecido' 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {dados.situacao}
            </span>
            <span className="text-xs text-gray-500">
              {dados.idade} • {dados.sexo}
            </span>
          </div>

          <div className="text-sm text-gray-600">
            <p><span className="font-semibold">Desaparecido em:</span> {dados.dataDesaparecimento}</p>
            <p><span className="font-semibold">Local:</span> {dados.local}</p>
            <p><span className="font-semibold">Vestimentas:</span> {dados.vestimentas}</p>
          </div>
        </div>

        <Link
          to={`/detalhes/${pessoa.id}`}
          className="mt-auto w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          Ver Detalhes Completo
        </Link>
      </div>
    </div>
  );
};

CardDesaparecido.propTypes = {
  pessoa: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string,
    idade: PropTypes.number,
    sexo: PropTypes.string,
    foto: PropTypes.string,
    dataDesaparecimento: PropTypes.string,
    localDesaparecimento: PropTypes.string,
    vestimentas: PropTypes.string,
    situacao: PropTypes.string
  }).isRequired
};

export default CardDesaparecido;