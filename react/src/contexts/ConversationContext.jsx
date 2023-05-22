import { createContext, useContext, useState } from "react";


const ConversationContext = createContext({
  conversationId: null,
  setConversationId: (id) => {}
});

export const ConversationContextProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState(null);

  return (
    <ConversationContext.Provider value={{ conversationId, setConversationId }}>
      { children }
    </ConversationContext.Provider>
  );
};

export const useConversationContext = () => useContext(ConversationContext);