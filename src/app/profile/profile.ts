export interface Profile {
  id?: string;
  username: string;
  description: string;
  likes: number;
  friends_number: number;
  friends: string;
  total_sent_messages: number;
  timestamp: Date;
}

