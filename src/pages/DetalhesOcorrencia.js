import React, { useState, useEffect } from 'react';
import { listarInformacoesDesaparecido } from '../services/api';

function DetalhesOcorrencia({ ocorrenciaId }) {
    const [ocorrencia, setOcorrencia] = useState(null);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await listarInformacoesDesaparecido(ocorrenciaId);
                if (data) {
                    setOcorrencia(data);
                } else {
                    setErro('Ocorrência não encontrada.');
                }
            } catch (error) {
                setErro('Erro ao buscar detalhes da ocorrência: ' + error.message);
            } finally {
                setCarregando(false);
            }
        }
        fetchData();
    }, [ocorrenciaId]);

    if (carregando) {
        return <div>Carregando...</div>;
    }

    if (erro) {
        return <div>{erro}</div>;
    }

    if (!ocorrencia) {
        return null;
    }

    return (
        <div>
            <h2>Detalhes da Ocorrência</h2>
            <p>Nome: {ocorrencia.nome}</p>
            {/* Exiba outros detalhes da ocorrência */}
        </div>
    );
}

export default DetalhesOcorrencia;