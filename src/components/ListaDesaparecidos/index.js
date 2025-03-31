import React from 'react';
import { Link } from 'react-router-dom';
import { listaDesaparecidosPropTypes } from './PropTypes';

const ListaDesaparecidos = ({ desaparecidos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {desaparecidos.map((pessoa) => (
        <Link 
          to={`/detalhes/${pessoa.id}`} 
          key={pessoa.id} 
          className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="w-32 h-32 flex-shrink-0">
            <img 
              src={pessoa.foto} 
              alt={`Foto de ${pessoa.nome}`} 
              className="w-full h-full object-cover"
              onError={(e) => e.target.src = '/images/placeholder.png'}
            />
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{pessoa.nome}</h3>
            <p className="text-sm text-gray-600 mb-1">Idade: {pessoa.idade}</p>
            <p className="text-sm">
              Situação: 
              <span className={
                pessoa.situacao === 'DESAPARECIDO' 
                  ? 'ml-1 text-red-600 font-semibold' 
                  : 'ml-1 text-green-600 font-semibold'
              }>
                {pessoa.situacao}
              </span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

ListaDesaparecidos.propTypes = listaDesaparecidosPropTypes;

export default ListaDesaparecidos;
