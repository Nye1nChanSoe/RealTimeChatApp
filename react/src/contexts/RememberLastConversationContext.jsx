import { createContext, useContext, useState } from "react";

const RememberLastConversationContext = createContext({
  conversationID: null,
  setConversationID: (conversationID) => {},
});

export const RememberLastConversationContextProvider = ({ children }) => {
  const [conversationID, _setConversationID] = useState(localStorage.getItem(import.meta.env.VITE_LAST_CONVERSATION));

  const setConversationID = (conversationID) => {
    _setConversationID(conversationID);
    if(conversationID) {
      localStorage.setItem(import.meta.env.VITE_LAST_CONVERSATION, conversationID);
    } else {
      localStorage.removeItem(import.meta.env.VITE_LAST_CONVERSATION);
    }
  }

  return (
    <RememberLastConversationContext.Provider value={{ conversationID, setConversationID }}>
      { children }
    </RememberLastConversationContext.Provider>
  );
};

export const useLastConversastionContext = () => useContext(RememberLastConversationContext);