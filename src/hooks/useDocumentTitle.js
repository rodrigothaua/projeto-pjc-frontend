import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `Abitus${title ? ` - ${title}` : ''}`;
    
    return () => {
      document.title = 'Abitus';
    };
  }, [title]);
};

export default useDocumentTitle;
