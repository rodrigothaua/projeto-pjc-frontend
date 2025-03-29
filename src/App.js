import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import Loading from './components/Loading'

const Listagem = lazy(() => import('./pages/Listagem'))
const Detalhes = lazy(() => import('./pages/Detalhes'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ErrorFallback({ error }) {
  return (
    <div className="p-4 text-red-500">
      <h2>Ocorreu um erro:</h2>
      <p>{error.message}</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Listagem />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App