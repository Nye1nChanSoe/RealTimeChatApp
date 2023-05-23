import Conversations from '../components/Conversations';
import Messages from '../components/Messages';
import Navigation from '../components/Navigation';
import { MessageContextProvider } from '../contexts/MessageContext';

const Home = () => {
  return (
    <div className='flex h-screen'>
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
  );
};

export default Home;