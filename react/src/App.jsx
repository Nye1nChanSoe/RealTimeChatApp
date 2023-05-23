import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthContextProvider } from './contexts/AuthContext';
import { UtilityContextProvider } from './contexts/UtilityContext';

const App = () => {
  return (
    <AuthContextProvider>
      <UtilityContextProvider>
        <RouterProvider router={ router } />
      </UtilityContextProvider>
    </AuthContextProvider>
  );
};

export default App;