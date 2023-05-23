import { Outlet, useNavigate } from "react-router-dom";
import { useUtilityContext } from '../contexts/UtilityContext';
import { useEffect } from "react";

const AuthLayout = () => {
  const {notification, type, selectedConversation} = useUtilityContext();
  const navigate = useNavigate();

  const error = 'bg-red-500 max-w-lg text-center py-3 px-4 text-white rounded-lg translate-x-[175px]';
  const info = 'bg-sky-500 max-w-lg text-center py-3 px-4 text-white rounded-lg translate-x-[175px]';

  // redirect to the previously selected conversation
  useEffect(() => {
    if(selectedConversation) {
      navigate(`/chats/${selectedConversation}`);
    }
  }, []);

  return (
    <div>
      <main>
        <Outlet />
      </main>

      {/* Notifications */}
      {
        notification && 
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-20">
          <div className={ type === 'info' ? info : error }>
            { notification }
          </div>
        </div>
      }

    </div>
  );
};

export default AuthLayout;