import Conversations from '../components/Conversations';
import Messages from '../components/Messages';
import Navigation from '../components/Navigation';
import { MessageContextProvider } from '../contexts/MessageContext';

const Home = () => {
  return (
    <div className='flex h-screen'>
      <aside className='relative w-[350px] py-4 border-x'>
        <Conversations />
      </aside>
      <section className='relative flex-1 border-r'>
        <Navigation />
        <MessageContextProvider>
          <Messages />
        </MessageContextProvider>
      </section>
    </div>
  );
};

export default Home;