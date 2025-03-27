import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { useDropzone } from "react-dropzone";

function FormularioInformacoes() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [fotos, setFotos] = useState([]);

    const { getRootProps, getInputProps } = useDropzone ({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setFotos(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para enviar os dados para a API
        console.log({ nome, telefone, localizacao, fotos })
    }

    return (
        <div>
            <h2>Enviar Informações</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="telefone">Telefone:</label>
                    <InputMask
                        mask="(99) 9999-9999"
                        id="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="localizacao">Localização:</label>
                    <input
                        type="text"
                        id="localizacao"
                        value={localizacao}
                        onChange={(e) => setLocalizacao(e.target.value)}
                    />
                    </div>
                    <div>
                    <label>Fotos:</label>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Arraste e solte fotos aqui, ou clique para selecionar arquivos</p>
                    </div>
                    <div>
                        {fotos.map((file) => (
                        <img key={file.name} src={file.preview} alt={file.name} style={{ width: '100px', margin: '10px' }} />
                        ))}
                    </div>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default FormularioInformacoes;