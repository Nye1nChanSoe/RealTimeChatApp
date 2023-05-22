import Conversations from '../components/Conversations';
import Messages from '../components/Messages';
import Navigation from '../components/Navigation';

import { ConversationContextProvider } from '../contexts/ConversationContext';

const Home = () => {
  return (
    <div className='flex h-screen'>
        <aside className='relative w-[350px] py-4 border-x'>
          <Conversations />
        </aside>
        <section className='relative flex-1 border-r'>
          <Navigation />
          <Messages />
        </section>
    </div>
  );
};

export default Home;