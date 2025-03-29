import PropTypes from 'prop-types';

export const listaDesaparecidosPropTypes = {
  desaparecidos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nome: PropTypes.string.isRequired,
      idade: PropTypes.number,
      situacao: PropTypes.oneOf(['DESAPARECIDO', 'LOCALIZADO']).isRequired
    })
  ).isRequired
};