import { createContext, useContext, useState } from "react";

const MessageContext = createContext({
  messages: null,
  setMessages: (messages) => {},
});

export const MessageContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      { children }
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => useContext(MessageContext);