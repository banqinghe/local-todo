import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Todo from '@/components/Todo';
import { getCatalog } from '@/utils';
import { Catalog } from '@/types';
import { CatalogContext } from '@/context';

export default function App() {
  const [catalog, setCatalog] = useState<Catalog>([]);

  const updateCatalog = () => {
    getCatalog().then(catalog => setCatalog(catalog || []));
  };

  useEffect(() => {
    updateCatalog();
  }, []);

  return (
    <div
      h="screen"
      overflow="hidden"
      flex="~ col"
      bg="light-50 dark:gray-900"
      text="gray-700 dark:gray-200"
    >
      <Header />
      <div flex="~ 1" style={{ height: 'calc(100vh - 53px)' }}>
        <CatalogContext.Provider value={{ catalog, updateCatalog }}>
          <Sidebar className="min-w-52" />
          <Todo className="flex-1 h-full" />
        </CatalogContext.Provider>
      </div>
    </div>
  );
}
