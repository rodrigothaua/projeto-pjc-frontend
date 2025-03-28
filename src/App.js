import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaDesaparecidos from './components/ListaDesaparecidos';
import DetalheDesaparecido from './pages/DetalheDesaparecido';
import FormularioInformacoes from './pages/FormularioInformacoes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaDesaparecidos />} />
        <Route path="/detalhe/:id" element={<DetalheDesaparecido />} />
        <Route path="/informacoes/:id" element={<FormularioInformacoes />} />
      </Routes>
    </Router>
  );
}

export default App;