import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CardDesaparecido = ({ pessoa }) => {

  const situacaoFormatada = pessoa.situacao 
    ? pessoa.situacao.toLowerCase() 
    : 'desaparecido'; // Valor padrão

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
      <img 
        src={pessoa.foto} 
        alt={pessoa.nome}
        className="w-full h-48 object-cover border-b border-gray-100"
        onError={(e) => e.target.src = 'images/placeholder.png'}
      />
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{pessoa.nome}</h3>
        
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Idade:</span> {pessoa.idade || 'Não informada'}
          </p>
          
          <span className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold ${
            pessoa.situacao === 'DESAPARECIDO' 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
             {situacaoFormatada} {/* Use a variável formatada aqui */}
          </span>
        </div>

        <Link
          to={`/detalhes/${pessoa.id}`}
          className="mt-auto w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

CardDesaparecido.propTypes = {
  pessoa: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    idade: PropTypes.number,
    situacao: PropTypes.oneOf(['DESAPARECIDO', 'LOCALIZADO']).isRequired,
    foto: PropTypes.string
  }).isRequired
};

export default CardDesaparecido;