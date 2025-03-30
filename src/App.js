import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

const Listagem = lazy(() => import('./pages/Listagem'));
const Detalhes = lazy(() => import('./pages/Detalhes'));
const FormularioInformacoes = lazy(() => import('./components/FormularioInformacoes'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Listagem />} />
          <Route path="/detalhes/:id" element={<Detalhes />} />
          <Route path="/informacoes/:id" element={<FormularioInformacoes />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;