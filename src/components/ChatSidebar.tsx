
import React from 'react';
import { Avatar } from "../components/ui/avatar";
import { Search, UserPlus, LogIn } from "lucide-react";
import { ContactType } from '../types/chat';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface ChatSidebarProps {
  contacts: ContactType[];
  activeContact: ContactType | null;
  setActiveContact: (contact: ContactType) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  contacts, 
  activeContact, 
  setActiveContact 
}) => {
  return (
    <aside className="w-full md:w-80 h-full border-r flex flex-col bg-white">
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">KurdishChat</h1>
        <div className="flex gap-2">
          <Link to="/signin">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <LogIn className="h-4 w-4" />
              <span className="text-xs">Sign In</span>
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              <span className="text-xs">Sign Up</span>
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="relative p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-chat-blue focus:border-chat-blue"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => setActiveContact(contact)}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              activeContact?.id === contact.id
                ? "bg-blue-50 text-chat-blue"
                : "hover:bg-gray-50"
            }`}
          >
            <Avatar className="h-10 w-10 mr-3">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="h-full w-full object-cover rounded-full"
              />
            </Avatar>
            <div className="flex-1 min-w-0 text-left">
              <p className="font-medium truncate">{contact.name}</p>
              <p className="text-sm text-gray-500 truncate">
                {contact.status}
              </p>
            </div>
            {contact.unread > 0 && (
              <span className="ml-2 bg-chat-blue text-white text-xs font-bold px-2 py-1 rounded-full">
                {contact.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default ChatSidebar;
