import { useContext, useState, createContext } from 'react';

const UtilityContext = createContext({
  notification: null,
  type: null,
  selectedConversation: null,
  setNotification: (notification) => {},
  setType: (type) => {},
  setSelectedConversation: (conversation) => {},
});

export const UtilityContextProvider = ({ children }) => {
  const [notification, _setNotification] = useState(null);
  const [type, setType] = useState(null);
  const [selectedConversation, _setSelectedConversation] = useState(localStorage.getItem(import.meta.env.VITE_SELECTED_CONVERSATION));

  const setNotification = (notification) => {
    _setNotification(notification);
    setTimeout(() => {
      _setNotification(null);
    }, 8000);
  };

  const setSelectedConversation = (conversation) => {
    _setSelectedConversation(conversation);
    if(conversation) {
      localStorage.setItem(import.meta.env.VITE_SELECTED_CONVERSATION, conversation);
    } else {
      localStorage.removeItem(import.meta.env.VITE_SELECTED_CONVERSATION);
    }
  };

  return (
    <UtilityContext.Provider value={{ notification, setNotification, type, setType, selectedConversation, setSelectedConversation }}>
      { children }
    </UtilityContext.Provider>
  );
};

export const useUtilityContext = () => useContext(UtilityContext);