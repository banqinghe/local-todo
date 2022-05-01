import { useSetRecoilState } from 'recoil';
import { getSidebarInfo } from '@/utils';
import { sidebarInfoState } from '@/recoil/atoms';
import { SidebarInfo } from '@/types';

export default function useUpdateSidebar() {
  const setSidebarInfo = useSetRecoilState(sidebarInfoState);
  const updateSidebar = async (): Promise<SidebarInfo> => {
    const [todoInfoList, todoRecycleList] = await getSidebarInfo();
    setSidebarInfo({ todoInfoList, todoRecycleList });
    return {
      todoInfoList,
      todoRecycleList,
    };
  };
  return updateSidebar;
}
