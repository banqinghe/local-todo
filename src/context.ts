import React from 'react';
import { SidebarInfo } from './types';

export const CatalogContext = React.createContext<{
  sidebarInfo: SidebarInfo;
  updateCatalog: () => void;
}>({
  sidebarInfo: { todoInfoList: [], todoRecycleList: [] },
  updateCatalog: () => {},
});
