import { useNavigate, useParams } from 'react-router-dom';
import Conversations from '../components/Conversations';
import Messages from '../components/Messages';
import Navigation from '../components/Navigation';
import { MessageContextProvider } from '../contexts/MessageContext';
import { useLastConversastionContext } from '../contexts/RememberLastConversationContext';
import { useEffect } from 'react';

const Home = () => {
  const {conversationId} = useParams();
  const {conversationID} = useLastConversastionContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the URL parameter user typed in manually
    if(conversationId) {
      return navigate(`chats/${conversationId}`);
    }
    // Redirect to the last conversation id stored in the client browser
    if(conversationID) {
      return navigate(`chats/${conversationID}`);
    }
  }, []);

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex'>
        <aside className='relative w-[350px] py-4 border-x'>
          <Conversations />
          <div className='absolute bottom-0 left-0 right-0 border-t'>
            <Navigation />
          </div>
        </aside>
        <section className='relative flex-1 border-r'>
          <MessageContextProvider>
            <Messages />
          </MessageContextProvider>
        </section>
      </div>
    </div>
  );
};

export default Home;