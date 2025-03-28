import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const ListaDesaparecidos = React.lazy(() => import('./components/ListaDesaparecidos'));
const FormularioInformacoes = React.lazy(() => import('./pages/FormularioInformacoes'));
const DetalheDesaparecido = React.lazy(() => import('./pages/DetalheDesaparecido')); 

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<ListaDesaparecidos />} />
          <Route path="/formulario" element={<FormularioInformacoes />} />
          <Route path="/detalhe/:id" element={<DetalheDesaparecido />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;