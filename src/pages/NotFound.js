import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-4">404 - Página Não Encontrada</h1>
      <p className="mb-4">A página que você está procurando não existe.</p>
      <Link 
        to="/" 
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}