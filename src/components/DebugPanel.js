import React, { useState } from 'react';

const DebugPanel = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 m-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg"
      >
        {isOpen ? 'Fechar Debug' : 'Debug'}
      </button>
      
      {isOpen && (
        <div className="bg-white border border-gray-300 rounded-md shadow-xl p-4 mt-2 max-w-lg max-h-96 overflow-auto">
          <h3 className="font-bold mb-2">Estado da Aplicação</h3>
          <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
