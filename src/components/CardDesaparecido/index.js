import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cardDesaparecidoPropTypes } from './PropTypes';
import styles from './styles.module.css';

const CardDesaparecido = ({ pessoa }) => {
  return (
    <div className={styles.cartao}>
      <img 
        src={pessoa.foto} 
        alt={pessoa.nome} 
        className={styles.foto}
      />
      <div className={styles.conteudo}>
        <h3 className={styles.nome}>{pessoa.nome}</h3>
        <p className={styles.info}>Idade: {pessoa.idade}</p>
        <p className={styles.situacao}>{pessoa.situacao}</p>
        <Link 
          to={`/detalhes/${pessoa.id}`} 
          className={styles.botao}
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

CardDesaparecido.propTypes = cardDesaparecidoPropTypes;

export default CardDesaparecido;