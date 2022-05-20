import { useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Main from '@/components/Main';
import FooterNav from '@/components/FooterNav';
import useUpdateSidebar from './hooks/useUpdateSidebar';

export default function App() {
  const updateSidebar = useUpdateSidebar();

  useEffect(() => {
    updateSidebar();
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
        <Sidebar className="hidden md:flex md:w-42 lg:w-52" />
        <Main className="flex-1 h-full" />
      </div>
      <FooterNav />
    </div>
  );
}
