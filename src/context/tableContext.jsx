import React, { createContext } from 'react';

export const TableContext = createContext({
  data: [],
  setTableData: () => {}
});