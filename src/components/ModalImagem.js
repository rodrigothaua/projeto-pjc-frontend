import React from 'react';
import PropTypes from 'prop-types';

const ModalImagem = ({ aberto, onFechar, imagemUrl, nome }) => {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{nome}</h2>
          <button
            onClick={onFechar}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <img
          src={imagemUrl}
          alt={`Ampliada: ${nome}`}
          className="w-full h-auto max-h-[70vh] object-contain"
        />
      </div>
    </div>
  );
};

ModalImagem.propTypes = {
  aberto: PropTypes.bool.isRequired,
  onFechar: PropTypes.func.isRequired,
  imagemUrl: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired
};

export default ModalImagem;