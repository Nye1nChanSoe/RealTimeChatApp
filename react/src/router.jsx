import { Navigate, createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import GuestLayout from './layouts/GuestLayout';
import Login from './views/Login';
import Register from './views/Register';
import PageNotFound from './views/PageNotFound';
import Home from './views/Home';

/**
 * Which page to render when '/' will be decided based on the user is authenticated or not
 * Need Stat Manaement and will utilize the Context API to maintain authentication state
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/chats' />
      },
      {
        path: '/chats',
        element: <Home />
      },
      {
        path: '/chats/:conversationId',
        element: <Home />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/login' />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
  {
    path: '*',
    element: <PageNotFound />
  }
]);

export default router;