import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { ContactType, MessageType } from '../types/chat';
import { format } from 'date-fns';
import { useToast } from '../hooks/use-toast';
import { useIsMobile } from '../hooks/use-mobile';
const initialContacts: ContactType[] = [{
  id: '1',
  name: 'Lana Xan',
  avatar: 'https://i.pravatar.cc/150?img=1',
  status: 'Online',
  unread: 3
}, {
  id: '2',
  name: 'David Miller',
  avatar: 'https://i.pravatar.cc/150?img=8',
  status: 'Last seen 1h ago',
  unread: 0
}, {
  id: '3',
  name: 'Emily Davis',
  avatar: 'https://i.pravatar.cc/150?img=5',
  status: 'Typing...',
  unread: 0
}, {
  id: '4',
  name: 'Thomas Wilson',
  avatar: 'https://i.pravatar.cc/150?img=7',
  status: 'Last seen yesterday',
  unread: 0
}, {
  id: '5',
  name: 'Jessica Taylor',
  avatar: 'https://i.pravatar.cc/150?img=9',
  status: 'Online',
  unread: 1
}];

// Chat history for demo purposes
const initialMessagesByContact: Record<string, MessageType[]> = {
  '1': [{
    sender: 'them',
    text: 'Hey there! How are you doing today?',
    time: '10:32 AM'
  }, {
    sender: 'me',
    text: 'I\'m good, thanks! Just working on a new project. How about you?',
    time: '10:34 AM'
  }, {
    sender: 'them',
    text: 'That sounds interesting! What kind of project is it?',
    time: '10:35 AM'
  }, {
    sender: 'them',
    text: 'I\'m just preparing for my vacation next week.',
    time: '10:35 AM'
  }],
  '2': [{
    sender: 'them',
    text: 'Hello! Did you get a chance to review the document I sent?',
    time: '9:15 AM'
  }],
  '3': [{
    sender: 'them',
    text: 'When is our next team meeting?',
    time: 'Yesterday'
  }, {
    sender: 'me',
    text: 'I think it\'s scheduled for Thursday at 2pm',
    time: 'Yesterday'
  }, {
    sender: 'them',
    text: 'Perfect, thank you!',
    time: 'Yesterday'
  }],
  '4': [{
    sender: 'me',
    text: 'Hey Thomas, are you still coming to the event on Saturday?',
    time: 'Monday'
  }],
  '5': [{
    sender: 'them',
    text: 'Have you seen the new movie everyone is talking about?',
    time: 'Sunday'
  }, {
    sender: 'me',
    text: 'Not yet! Is it good?',
    time: 'Sunday'
  }, {
    sender: 'them',
    text: 'It\'s amazing! We should go see it sometime.',
    time: 'Sunday'
  }]
};
const ChatApp: React.FC = () => {
  const [contacts, setContacts] = useState<ContactType[]>(initialContacts);
  const [activeContact, setActiveContact] = useState<ContactType | null>(null);
  const [messagesByContact, setMessagesByContact] = useState<Record<string, MessageType[]>>(initialMessagesByContact);
  const [showSidebar, setShowSidebar] = useState(true);
  const {
    toast
  } = useToast();
  const isMobile = useIsMobile();
  const handleContactSelect = (contact: ContactType) => {
    // Clear unread count when selecting a contact
    setContacts(contacts.map(c => c.id === contact.id ? {
      ...c,
      unread: 0
    } : c));
    setActiveContact(contact);

    // On mobile, hide sidebar when a contact is selected
    if (isMobile) {
      setShowSidebar(false);
    }
  };
  const handleSendMessage = (text: string) => {
    if (!activeContact) return;
    const newMessage: MessageType = {
      sender: 'me',
      text,
      time: format(new Date(), 'h:mm a')
    };

    // Add new message to the conversation
    setMessagesByContact(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage]
    }));

    // Simulate response after a delay
    setTimeout(() => {
      const responses = ["That's interesting! Tell me more.", "I see what you mean.", "Good point!", "I'll think about that.", "Thanks for sharing!", "Let me get back to you on that.", "I appreciate your perspective."];
      const responseMessage: MessageType = {
        sender: 'them',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: format(new Date(), 'h:mm a')
      };
      setMessagesByContact(prev => ({
        ...prev,
        [activeContact.id]: [...(prev[activeContact.id] || []), responseMessage]
      }));
      toast({
        title: `New message from ${activeContact.name}`,
        description: responseMessage.text
      });
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      {isMobile && <button onClick={toggleSidebar} className="fixed top-4 left-4 z-20 bg-white p-2 rounded-full shadow-md text-gray-950">
          <div className="w-5 h-5 flex flex-col justify-center space-y-1">
            <span className="h-0.5 w-full bg-gray-600 rounded-full"></span>
            <span className="h-0.5 w-full bg-gray-600 rounded-full"></span>
            <span className="h-0.5 w-full bg-gray-600 rounded-full"></span>
          </div>
        </button>}
      
      {/* Sidebar */}
      <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} transform transition-transform duration-300 fixed md:static z-10 md:z-0 h-full md:translate-x-0`}>
        <ChatSidebar contacts={contacts} activeContact={activeContact} setActiveContact={handleContactSelect} />
      </div>
      
      {/* Chat window */}
      <div className={`flex-1 flex ${isMobile && showSidebar ? 'opacity-50' : 'opacity-100'} transition-opacity`}>
        <ChatWindow activeContact={activeContact} messages={activeContact ? messagesByContact[activeContact.id] || [] : []} onSendMessage={handleSendMessage} />
      </div>
    </div>;
};
export default ChatApp;