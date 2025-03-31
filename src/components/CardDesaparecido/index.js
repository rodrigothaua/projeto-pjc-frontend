import React from 'react';
import { Link } from 'react-router-dom';
import { cardDesaparecidoPropTypes } from './PropTypes';

const CardDesaparecido = ({ pessoa }) => {
  const getDadosFormatados = () => ({
    nome: pessoa.nome || 'Nome não informado',
    idade: pessoa.idade ?? 'Idade não informada',
    sexo: (pessoa.sexo || 'Não informado').toLowerCase(),
    situacao: pessoa.situacao || 'DESAPARECIDO',
    foto: pessoa.foto || '/images/placeholder.png',
    dataDesaparecimento: pessoa.dataDesaparecimento 
      ? new Date(pessoa.dataDesaparecimento).toLocaleDateString('pt-BR')
      : 'Data desconhecida',
    local: pessoa.localDesaparecimento || 'Local não informado',
    vestimentas: pessoa.vestimentas || 'Vestimentas não informadas'
  });

  const dados = getDadosFormatados();

  return (
    <Link 
      to={`/detalhes/${pessoa.id}`} 
      className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full no-underline"
    >
      <div className="relative w-full" style={{ height: '300px' }}>
        <img 
          src={dados.foto}
          alt={dados.nome}
          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
          onError={(e) => e.target.src = '/images/placeholder.png'}
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
          dados.situacao === 'DESAPARECIDO' 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {dados.situacao === 'DESAPARECIDO' ? 'Desaparecido' : 'Localizado'}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          {dados.nome}
        </h3>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Idade:</span> {dados.idade}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Sexo:</span> {dados.sexo}
          </p>
          {dados.dataDesaparecimento && (
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Desaparecido em:</span> {dados.dataDesaparecimento}
            </p>
          )}
          {dados.local && dados.local !== 'Local não informado' && (
            <p className="text-sm text-gray-600 mb-1 line-clamp-1">
              <span className="font-medium">Local:</span> {dados.local}
            </p>
          )}
        </div>
        
        <div className="mt-auto pt-2 border-t border-gray-100">
          <span className="text-blue-600 text-sm font-medium">Ver detalhes</span>
        </div>
      </div>
    </Link>
  );
};

CardDesaparecido.propTypes = cardDesaparecidoPropTypes;

export default CardDesaparecido;
