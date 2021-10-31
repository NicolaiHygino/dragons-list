import React, { useReducer, useContext, createContext } from 'react';
import { initialState, dragonsReducer } from './dragonsReducer';

const Dragons = createContext();
Dragons.displayName = 'Dragons';

export const useDragons = () => useContext(Dragons);

export const DragonsProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(dragonsReducer, initialState);
  
  return (
    <Dragons.Provider value={[globalState, dispatch]}>
      {children}
    </Dragons.Provider>
  );
};
