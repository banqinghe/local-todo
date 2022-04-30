import { atom } from 'recoil';
import { SidebarInfo } from '@/types';

export const sidebarInfoState = atom<SidebarInfo>({
  key: 'SidebarInfoState',
  default: {
    todoInfoList: [],
    todoRecycleList: [],
  },
});

// export const
