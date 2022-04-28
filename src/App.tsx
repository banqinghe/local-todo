import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Todo from '@/components/Todo';
import { getSidebarInfo } from '@/utils';
import { TodoBriefList } from '@/types';
import { CatalogContext } from '@/context';

export default function App() {
  const [sidebarInfo, setSidebarInfo] = useState<{
    todoInfoList: TodoBriefList;
    todoRecycleList: TodoBriefList;
  }>({
    todoInfoList: [],
    todoRecycleList: [],
  });

  const updateCatalog = () => {
    getSidebarInfo().then(([todoInfoList, todoRecycleList]) => {
      setSidebarInfo({ todoInfoList, todoRecycleList });
    });
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
        <CatalogContext.Provider value={{ sidebarInfo, updateCatalog }}>
          <Sidebar className="hidden md:flex md:w-42 lg:w-52" />
          <Todo className="flex-1 h-full" />
        </CatalogContext.Provider>
      </div>
    </div>
  );
}
