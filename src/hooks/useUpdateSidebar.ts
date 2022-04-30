import { useSetRecoilState } from 'recoil';
import { getSidebarInfo } from '@/utils';
import { sidebarInfoState } from '@/recoil/atoms';

export default function useUpdateSidebar() {
  const setSidebarInfo = useSetRecoilState(sidebarInfoState);
  const updateSidebar = () => {
    getSidebarInfo().then(([todoInfoList, todoRecycleList]) => {
      setSidebarInfo({ todoInfoList, todoRecycleList });
    });
  };
  return updateSidebar;
}
