import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthContextProvider } from './contexts/AuthContext';
import { ErrorHandlingContextProvider } from './contexts/ErrorHandlingContext';
import { RememberLastConversationContextProvider } from './contexts/RememberLastConversationContext';

const App = () => {
  return (
    <AuthContextProvider>
      <ErrorHandlingContextProvider>
        <RememberLastConversationContextProvider>
          <RouterProvider router={ router } />
        </RememberLastConversationContextProvider>
      </ErrorHandlingContextProvider>
    </AuthContextProvider>
  );
};

export default App;