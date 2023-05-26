import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthContextProvider } from './contexts/AuthContext';
import { ErrorHandlingContextProvider } from './contexts/ErrorHandlingContext';

const App = () => {
  return (
    <AuthContextProvider>
      <ErrorHandlingContextProvider>
        <RouterProvider router={ router } />
      </ErrorHandlingContextProvider>
    </AuthContextProvider>
  );
};

export default App;