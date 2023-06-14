import { createContext, useContext, useRef, useState } from "react";

const MessageContext = createContext({
  messages: null,
  setMessages: (messages) => {},
  imageURLs: [],
});

export const MessageContextProvider = ({ children }) => {
  // store the messages of a single conversation
  const [messages, setMessages] = useState([]);
  const imageURLs = useRef([]);

  return (
    <MessageContext.Provider value={{ messages, setMessages, imageURLs }}>
      { children }
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => useContext(MessageContext);