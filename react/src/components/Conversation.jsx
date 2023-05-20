import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const Conversation = () => {
  const messages = [
    {
      id: 1,
      name: 'Nyein Chan Soe',
      message: 'Hi',
      timestamp: 'Mon',
      sender: 'self',
    },
    {
      id: 2,
      name: 'John Doe',
      message: 'Hello, what\'s up',
      timestamp: 'Mon',
      sender: 'other',
    },
    {
      id: 3,
      name: 'Nyein Chan Soe',
      message: 'Fine!! How you doin',
      timestamp: 'Mon',
      sender: 'self',
    },
    {
      id: 4,
      name: 'Nyein Chan Soe',
      message: 'And I want to inform you that we have a onboarding meeting on Wednesday. After that we can grap something',
      timestamp: 'Mon',
      sender: 'self',
    },
    {
      id: 5,
      name: 'Nyein Chan Soe',
      message: 'Make sure you are free on that day!',
      timestamp: 'Mon',
      sender: 'self',
    },
    {
      id: 6,
      name: 'John Doe',
      message: 'Oh really, I am glad that you informed me.',
      timestamp: 'Mon',
      sender: 'other',
    },
    {
      id: 7,
      name: 'John Doe',
      message: 'Alright, see you on Wednesday mate',
      timestamp: 'Mon',
      sender: 'other',
    },
    {
      id: 8,
      name: 'Nyein Chan Soe',
      message: 'Sure',
      timestamp: 'Mon',
      sender: 'self',
    },
  ];

  return (
    <div>
      <div className="overflow-y-auto px-6" style={{ height: 'calc(100vh - 160px)' }}>
      <ChatHeader />
        {
          messages.map((msg) => <MessageBubble name={ msg.name } message={ msg.message } isSelf={ msg.sender === 'self' } />)
        }
      </div>
      <MessageInput />
    </div>
  )
};

export default Conversation;