
export interface ContactType {
  id: string;
  name: string;
  avatar: string;
  status: string;
  unread: number;
}

export interface MessageType {
  sender: 'me' | 'them';
  text: string;
  time: string;
}
