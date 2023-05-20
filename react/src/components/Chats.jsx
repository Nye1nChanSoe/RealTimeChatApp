import Chat from './Chat';

const Chats = () => {
  const chats = [
    {
      id: 1,
      title: 'Title 1',
      participants: ['User 1'],
      message: 'Hi there',
      timestamp: 'Mon'
    },
    {
      id: 2,
      title: 'Title 2',
      participants: ['User 2'],
      message: 'Yo! What\'s up',
      timestamp: 'Mon'
    },
    {
      id: 3,
      title: 'Title 3',
      participants: ['User 3'],
      message: 'What are you doin?',
      timestamp: 'Mon'
    },
    {
      id: 4,
      title: 'Title 4',
      participants: ['User 4'],
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum culpa eaque recusandae fuga saepe atque dolorem quo repellat harum necessitatibus, reiciendis a asperiores aut, nostrum consequuntur cum iste alias quis!',
      timestamp: 'Mon'
    },
    {
      id: 5,
      title: 'Title 5',
      participants: ['User 5'],
      message: 'Great! Bye..',
      timestamp: 'Mon'    
    }
  ]

  return (
    <div>
      <div className='px-6 pb-4'>
        <input type="search" placeholder="Search..." className='border px-2 py-2 w-full rounded-lg' />
      </div>
      <div>
        {
          chats.map((chat) => <Chat key={ chat.id } data={ chat } />)
        }
      </div>
    </div>
  );
};

export default Chats;