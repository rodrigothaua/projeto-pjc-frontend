import PropTypes from 'prop-types';

export const cardDesaparecidoPropTypes = {
  pessoa: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    idade: PropTypes.number,
    situacao: PropTypes.oneOf(['DESAPARECIDO', 'LOCALIZADO']).isRequired,
    foto: PropTypes.string
  }).isRequired
};