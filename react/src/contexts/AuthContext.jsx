import { createContext, useContext, useState } from "react"

/**
 * including default values will trigger intellisense code suggestions
 * context object: to represent shared authentication data
 */
const AuthContext = createContext({
    user: null,
    token: null,
    setUser: (user) => {},
    setToken: (token) => {},
});

/**
 * context provider: to provide the context values to its child components
 * wraps the component(s) that need to access to the shared data
 */
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem(import.meta.env.VITE_API_TOKEN_KEY));

    const setToken = (token) => {
        _setToken(token);
        if(token) {
            localStorage.setItem(import.meta.env.VITE_API_TOKEN_KEY, token);
        } else {
            localStorage.removeItem(import.meta.env.VITE_API_TOKEN_KEY);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken }}>{ children }</AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);