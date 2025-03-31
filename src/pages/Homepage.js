import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CardDesaparecido from '../components/CardDesaparecido';

const HomePage = () => {
    const [desaparecidos, setDesaparecidos] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);

    useEffect(() => {
        const carregarDados = async () => {
        try {
            const resposta = await api.getPessoas(pagina);
            setDesaparecidos(resposta.content);
            setTotalPaginas(resposta.totalPages);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
        };
        
        carregarDados();
    }, [pagina]);

    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Pessoas Desaparecidas
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {desaparecidos.map((pessoa) => (
            <CardDesaparecido key={pessoa.id} pessoa={pessoa} />
            ))}
        </div>

        {/* Paginação */}
        <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPaginas }, (_, i) => (
            <button
                key={i}
                onClick={() => setPagina(i)}
                className={`px-4 py-2 rounded ${
                pagina === i
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                {i + 1}
            </button>
            ))}
        </div>
        </div>
    );
};

export default HomePage;