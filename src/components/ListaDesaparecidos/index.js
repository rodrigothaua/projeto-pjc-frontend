import React from 'react';
import PropTypes from 'prop-types';
import { listaDesaparecidosPropTypes } from './PropTypes';
import styles from './styles.module.css';

const ListaDesaparecidos = ({ desaparecidos }) => {
  return (
    <div className={styles.listaContainer}>
      {desaparecidos.map((pessoa) => (
        <div key={pessoa.id} className={styles.item}>
          <h3 className={styles.nome}>{pessoa.nome}</h3>
          <p className={styles.info}>Idade: {pessoa.idade}</p>
          <p className={styles.info}>Situação: {pessoa.situacao}</p>
        </div>
      ))}
    </div>
  );
};

ListaDesaparecidos.propTypes = listaDesaparecidosPropTypes;

export default ListaDesaparecidos;