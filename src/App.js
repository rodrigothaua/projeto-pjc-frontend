import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DebugPanel from './components/DebugPanel';

const Homepage = lazy(() => import('./pages/Homepage'));
const Detalhes = lazy(() => import('./pages/Detalhes'));
const Search = lazy(() => import('./pages/Search'));
const About = lazy(() => import('./pages/About'));

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debugData, setDebugData] = useState({});

  const handleSearch = (query) => {
    setSearchQuery(query);
    setDebugData(prev => ({ ...prev, lastSearch: query, timestamp: new Date().toISOString() }));
  };
  return (
    <BrowserRouter>
      <Navbar onSearch={handleSearch} />
      <main className='min-h-screen container mx-auto px-4 py-8'>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
            <Route path="/search" element={<Search query={searchQuery} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {process.env.NODE_ENV === 'development' && <DebugPanel data={debugData} />}
    </BrowserRouter>
  );
}

export default App;