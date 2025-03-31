import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchInputRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Efeito para focar no input quando o campo de pesquisa fica visível
  useEffect(() => {
    if (isSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchVisible]);

  // Função para lidar com a mudança no campo de pesquisa
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Implementação de debounce para evitar chamadas excessivas
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      if (onSearch && typeof onSearch === 'function') {
        onSearch(value);
      }
      
      // Se não estiver na página de pesquisa e tiver um termo, redireciona
      if (location.pathname !== '/search' && value.trim()) {
        navigate(`/search?q=${encodeURIComponent(value)}`);
      }
    }, 500); // 500ms de debounce
  };

  // Função para alternar a visibilidade do campo de pesquisa em dispositivos móveis
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          Abitus
        </div>
        
        {/* Campo de pesquisa para desktop */}
        <div className="hidden md:flex items-center relative flex-1 mx-10">
          <input
            type="text"
            placeholder="Buscar pessoa desaparecida..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute right-3 text-gray-500" />
        </div>
        
        {/* Links de navegação */}
        <div className="flex items-center space-x-4">
          {/* Botão de pesquisa para mobile */}
          <button 
            onClick={toggleSearchVisibility}
            className="md:hidden text-white hover:text-gray-300"
          >
            <FaSearch />
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="hover:text-gray-300"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/search')}
            className="hover:text-gray-300"
          >
            Pesquisar
          </button>
          <button 
            onClick={() => navigate('/about')}
            className="hover:text-gray-300"
          >
            Sobre
          </button>
        </div>
      </div>
      
      {/* Campo de pesquisa para mobile (aparece quando isSearchVisible é true) */}
      {isSearchVisible && (
        <div className="md:hidden mt-3 px-2">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar pessoa desaparecida..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;