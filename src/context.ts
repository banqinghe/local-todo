import React from 'react';
import { Catalog } from './types';

export const CatalogContext = React.createContext<{
  catalog: Catalog;
  updateCatalog: () => void;
}>({
  catalog: [],
  updateCatalog: () => {},
});
