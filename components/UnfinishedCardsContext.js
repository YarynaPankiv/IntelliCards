
import React, { createContext, useState } from 'react';

const UnfinishedCardsContext = createContext();

const UnfinishedCardsProvider = ({ children }) => {
  const [unfinishedCards, setUnfinishedCards] = useState([]);

  return (
    <UnfinishedCardsContext.Provider value={{ unfinishedCards, setUnfinishedCards }}>
      {children}
    </UnfinishedCardsContext.Provider>
  );
};

export { UnfinishedCardsProvider, UnfinishedCardsContext };
