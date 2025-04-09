
import React, { useEffect, useRef, useState } from 'react';
import { Avatar } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { ContactType, MessageType } from '../types/chat';
import { Send, Paperclip, Smile } from 'lucide-react';

interface ChatWindowProps {
  activeContact: ContactType | null;
  messages: MessageType[];
  onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  activeContact, 
  messages, 
  onSendMessage 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!activeContact) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-600 mb-2">Welcome to WebChat</h3>
          <p className="text-gray-500">Select a contact to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="border-b bg-white p-4 flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <img
            src={activeContact.avatar}
            alt={activeContact.name}
            className="h-full w-full object-cover rounded-full"
          />
        </Avatar>
        <div>
          <h2 className="font-medium">{activeContact.name}</h2>
          <p className="text-sm text-gray-500">{activeContact.status}</p>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'me' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender !== 'me' && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <img
                    src={activeContact.avatar}
                    alt={activeContact.name}
                    className="h-full w-full object-cover rounded-full"
                  />
                </Avatar>
              )}
              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg ${
                  message.sender === 'me'
                    ? 'bg-chat-blue text-white rounded-tr-none animate-slide-in'
                    : 'bg-chat-gray text-gray-800 rounded-tl-none animate-fade-in'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 text-right ${
                  message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t">
        <div className="flex items-center bg-gray-50 rounded-full px-3 py-2 border">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-full p-2 hover:bg-gray-100 text-gray-500"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent py-2 px-3 focus:outline-none"
          />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-full p-2 hover:bg-gray-100 text-gray-500"
          >
            <Smile className="h-5 w-5" />
          </Button>
          
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className={`rounded-full p-2 text-white ${
              newMessage.trim() ? 'bg-chat-blue hover:bg-chat-dark-blue' : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
