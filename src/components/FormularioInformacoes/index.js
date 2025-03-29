import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import api from '../../services/api';

const FormularioInformacoes = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    descricao: '',
    arquivos: [],
    localizacao: {
      latitude: '',
      longitude: ''
    }
  });
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  const handleArquivos = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      arquivos: [...prev.arquivos, ...files]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoordenada = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      localizacao: {
        ...prev.localizacao,
        [name]: value
      }
    }));
  };

  const validarFormulario = () => {
    const novosErros = {};
    
    if (!formData.descricao.trim()) {
      novosErros.descricao = 'Descrição é obrigatória';
    }
    
    if (formData.arquivos.length === 0) {
      novosErros.arquivos = 'Pelo menos uma foto é obrigatória';
    }
    
    if (!formData.localizacao.latitude || !formData.localizacao.longitude) {
      novosErros.localizacao = 'Coordenadas são obrigatórias';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setEnviando(true);
    
    try {
      const data = new FormData();
      data.append('descricao', formData.descricao);
      data.append('idPessoa', id);
      data.append('latitude', formData.localizacao.latitude);
      data.append('longitude', formData.localizacao.longitude);

      formData.arquivos.forEach((file, index) => {
        data.append(`arquivos`, file);
      });

      await api.enviarInformacao(data);
      alert('Informações enviadas com sucesso!');
      setFormData({
        descricao: '',
        arquivos: [],
        localizacao: { latitude: '', longitude: '' }
      });
    } catch (error) {
      alert(`Erro ao enviar: ${error.response?.data?.message || error.message}`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Enviar Informações</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Descrição *</label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${erros.descricao ? 'border-red-500' : 'border-gray-300'}`}
          rows="4"
          placeholder="Descreva as informações que possui sobre o desaparecido..."
        />
        {erros.descricao && <p className="text-red-500 text-sm mt-1">{erros.descricao}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Fotos *</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleArquivos}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {erros.arquivos && <p className="text-red-500 text-sm mt-1">{erros.arquivos}</p>}
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.arquivos.map((file, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
              {file.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Localização *</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputMask
              mask="99.999999"
              name="latitude"
              value={formData.localizacao.latitude}
              onChange={handleCoordenada}
              placeholder="Latitude (ex: -15.123456)"
              className={`w-full p-2 border rounded ${erros.localizacao ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div>
            <InputMask
              mask="99.999999"
              name="longitude"
              value={formData.localizacao.longitude}
              onChange={handleCoordenada}
              placeholder="Longitude (ex: -56.123456)"
              className={`w-full p-2 border rounded ${erros.localizacao ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
        </div>
        {erros.localizacao && <p className="text-red-500 text-sm mt-1">{erros.localizacao}</p>}
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
      >
        {enviando ? 'Enviando...' : 'Enviar Informações'}
      </button>
    </form>
  );
};

export default FormularioInformacoes;