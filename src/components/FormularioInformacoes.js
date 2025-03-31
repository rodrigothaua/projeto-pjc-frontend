import React, { useState } from 'react';
import { PatternFormat } from 'react-number-format';
import api from '../services/api';

const FormularioInformacoes = ({ idPessoa, onClose }) => {
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(null);
 
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    descricao: '',
    arquivos: [],
    localizacao: {
      latitude: '',
      longitude: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNumberFormatChange = (name, value) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArquivos = (e) => {
    setFormData(prev => ({
      ...prev,
      arquivos: Array.from(e.target.files)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      const dadosEnvio = {
        ...formData,
        idPessoa
      };

      await api.enviarInformacao(dadosEnvio);
     
      setSucesso(true);
      setTimeout(() => {
        onClose();
        setSucesso(false);
      }, 2000);
     
    } catch (error) {
      setErro(error.message);
    } finally {
      setEnviando(false);
    }
  };

  // Validação para coordenadas
  const validateCoordinate = (value, type) => {
    if (!value) return true;
    
    const latRegex = /^-?([0-8]?[0-9]|90)(\.[0-9]{1,6})?$/;
    const lngRegex = /^-?((1?[0-7]?|[0-9]?)[0-9]|180)(\.[0-9]{1,6})?$/;
    
    return type === 'latitude' ? latRegex.test(value) : lngRegex.test(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {sucesso && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
          Informações enviadas com sucesso!
        </div>
      )}

      {erro && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {erro}
        </div>
      )}

      {/* Campos adicionais para contato */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Seu Nome *
        </label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="Digite seu nome completo"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Telefone para Contato *
        </label>
        <PatternFormat
          format="(##) #####-####"
          name="telefone"
          value={formData.telefone}
          onValueChange={(values) => {
            handleNumberFormatChange('telefone', values.value);
          }}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="(00) 00000-0000"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Formato: (00) 00000-0000
        </p>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Descrição das Informações *
        </label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="4"
          required
          placeholder="Descreva detalhadamente as informações que possui sobre o desaparecido"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Anexar Fotos/Arquivos
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col w-full cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-6 transition-all">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                {formData.arquivos.length > 0
                  ? `${formData.arquivos.length} arquivo(s) selecionado(s)`
                  : 'Clique para selecionar arquivos ou arraste aqui'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Formatos suportados: JPG, PNG, PDF (até 5MB cada)
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={handleArquivos}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Latitude
          </label>
          <PatternFormat
            format="##.######"
            allowNegative={true}
            name="localizacao.latitude"
            value={formData.localizacao.latitude}
            onValueChange={(values) => {
              handleNumberFormatChange('localizacao.latitude', values.value);
            }}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              formData.localizacao.latitude && !validateCoordinate(formData.localizacao.latitude, 'latitude') 
                ? 'border-red-500' 
                : ''
            }`}
            placeholder="Ex: -15.123456"
          />
          {formData.localizacao.latitude && !validateCoordinate(formData.localizacao.latitude, 'latitude') && (
            <p className="text-xs text-red-500 mt-1">
              Latitude inválida. Deve estar entre -90 e 90.
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Formato: -00.000000 (entre -90 e 90)
          </p>
        </div>
       
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Longitude
          </label>
          <PatternFormat
            format="###.######"
            allowNegative={true}
            name="localizacao.longitude"
            value={formData.localizacao.longitude}
            onValueChange={(values) => {
              handleNumberFormatChange('localizacao.longitude', values.value);
            }}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              formData.localizacao.longitude && !validateCoordinate(formData.localizacao.longitude, 'longitude') 
                ? 'border-red-500' 
                : ''
            }`}
            placeholder="Ex: -56.123456"
          />
          {formData.localizacao.longitude && !validateCoordinate(formData.localizacao.longitude, 'longitude') && (
            <p className="text-xs text-red-500 mt-1">
              Longitude inválida. Deve estar entre -180 e 180.
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Formato: -000.000000 (entre -180 e 180)
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={enviando || 
            (formData.localizacao.latitude && !validateCoordinate(formData.localizacao.latitude, 'latitude')) ||
            (formData.localizacao.longitude && !validateCoordinate(formData.localizacao.longitude, 'longitude'))
          }
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {enviando ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Enviando...
            </span>
          ) : 'Enviar Informações'}
        </button>
      </div>
    </form>
  );
};

export default FormularioInformacoes;
