import Chats from '../components/Chats';
import Conversation from '../components/Conversation';
import Navigation from '../components/Navigation';

const Home = () => {
  return (
    <div className='flex h-screen'>
      <aside className='w-[350px] py-4 border-x'>
        <Chats />
      </aside>
      <section className='flex-1 border-r'>
        <Navigation />
        <Conversation />
      </section>
    </div>
  );
};

export default Home;